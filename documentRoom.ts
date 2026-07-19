// DocumentRoom Durable Object -- one instance per richtext document,
// addressed via env.DOCUMENT_ROOM.getByName(documentId). Holds the live
// Yjs CRDT state; D1's document_versions only ever holds frozen review
// snapshots (written by a Server Action, not by this class -- see
// app/portal/(app)/documents/actions.ts's submitForReviewAction). See plan
// (~/.claude/plans/it-s-working-well-let-s-wobbly-russell.md), section B.
//
// Reached only through worker.ts's custom fetch handler, which intercepts
// the WebSocket upgrade before Next.js ever sees the request -- Next.js
// Route Handlers cannot handle WebSocket upgrades at all (confirmed during
// the step-1 spike, see worker.ts's header comment).
import { DurableObject } from "cloudflare:workers";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
import * as syncProtocol from "y-protocols/sync";
import * as awarenessProtocol from "y-protocols/awareness";
import * as Y from "yjs";

const MESSAGE_SYNC = 0;
const MESSAGE_AWARENESS = 1;
// Out-of-band signal, not part of the standard y-websocket wire protocol --
// tells connected clients the room's lock state changed (submit-for-review
// / reopen-for-editing) without waiting for them to reconnect.
const MESSAGE_CONTROL = 2;
const CONTROL_READONLY_CHANGED = 0;

const COMPACT_DEBOUNCE_MS = 500;

type ConnectionAttachment = {
  userId: string;
  userName: string;
  color: string;
};

export class DocumentRoom extends DurableObject<Env> {
  doc: Y.Doc;
  awareness: awarenessProtocol.Awareness;
  roomReadOnly: boolean;
  private wsAwarenessClientIds: Map<WebSocket, Set<number>>;
  private ready: Promise<void>;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.doc = new Y.Doc();
    this.awareness = new awarenessProtocol.Awareness(this.doc);
    this.roomReadOnly = false;
    this.wsAwarenessClientIds = new Map();

    // Schema setup AND the state load both happen inside the same
    // blockConcurrencyWhile call, in sequence -- loadState() reads from
    // these tables, so it must run strictly after they're created, not as
    // a separately-kicked-off promise racing the CREATE TABLE statements
    // (that race was a real bug caught during implementation: loadState()
    // hit "no such table" because blockConcurrencyWhile's callback hadn't
    // actually run yet when it started). `ready` is what fetch()/RPC
    // methods await before touching `this.doc`.
    this.ready = ctx.blockConcurrencyWhile(async () => {
      this.ctx.storage.sql.exec(`
        CREATE TABLE IF NOT EXISTS yjs_updates (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          update_data BLOB NOT NULL
        )
      `);
      this.ctx.storage.sql.exec(`
        CREATE TABLE IF NOT EXISTS yjs_snapshots (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          snapshot BLOB NOT NULL
        )
      `);
      await this.loadState();
    });

    // Fires for every applied update, local or remote (origin === "storage"
    // means we're replaying persisted state at load time -- don't
    // re-persist/re-broadcast those).
    this.doc.on("update", (update: Uint8Array, origin: unknown) => {
      if (origin === "storage") return;
      this.persistUpdate(update);
      this.broadcastSyncUpdate(update, origin);
    });

    this.awareness.on(
      "update",
      ({ added, updated, removed }: { added: number[]; updated: number[]; removed: number[] }, origin: unknown) => {
        if (origin instanceof WebSocket) {
          const ids = this.wsAwarenessClientIds.get(origin) ?? new Set<number>();
          for (const id of added.concat(updated)) ids.add(id);
          for (const id of removed) ids.delete(id);
          this.wsAwarenessClientIds.set(origin, ids);
        }
        const changed = added.concat(updated, removed);
        if (changed.length === 0) return;
        const encoder = encoding.createEncoder();
        encoding.writeVarUint(encoder, MESSAGE_AWARENESS);
        encoding.writeVarUint8Array(encoder, awarenessProtocol.encodeAwarenessUpdate(this.awareness, changed));
        this.broadcastRaw(encoding.toUint8Array(encoder), origin);
      },
    );
  }

  private async loadState(): Promise<void> {
    const snapshotRows = this.ctx.storage.sql
      .exec<{ snapshot: ArrayBuffer }>("SELECT snapshot FROM yjs_snapshots ORDER BY id DESC LIMIT 1")
      .toArray();
    for (const row of snapshotRows) {
      Y.applyUpdate(this.doc, new Uint8Array(row.snapshot), "storage");
    }

    const updateRows = this.ctx.storage.sql
      .exec<{ update_data: ArrayBuffer }>("SELECT update_data FROM yjs_updates ORDER BY id ASC")
      .toArray();
    for (const row of updateRows) {
      Y.applyUpdate(this.doc, new Uint8Array(row.update_data), "storage");
    }

    const storedReadOnly = await this.ctx.storage.get<boolean>("readOnly");
    this.roomReadOnly = storedReadOnly ?? false;
  }

  private persistUpdate(update: Uint8Array): void {
    this.ctx.storage.sql.exec("INSERT INTO yjs_updates (update_data) VALUES (?)", update);
    // setAlarm replaces any existing alarm -- every new update pushes
    // compaction back by COMPACT_DEBOUNCE_MS, so it only actually fires
    // once edits pause. Safety doesn't depend on this: the update above is
    // already durably persisted before this call.
    void this.ctx.storage.setAlarm(Date.now() + COMPACT_DEBOUNCE_MS);
  }

  async alarm(): Promise<void> {
    const snapshot = Y.encodeStateAsUpdate(this.doc);
    this.ctx.storage.sql.exec("INSERT INTO yjs_snapshots (snapshot) VALUES (?)", snapshot);
    this.ctx.storage.sql.exec("DELETE FROM yjs_updates");
    this.ctx.storage.sql.exec(
      "DELETE FROM yjs_snapshots WHERE id NOT IN (SELECT id FROM yjs_snapshots ORDER BY id DESC LIMIT 1)",
    );
  }

  private broadcastSyncUpdate(update: Uint8Array, excludeOrigin: unknown): void {
    const encoder = encoding.createEncoder();
    encoding.writeVarUint(encoder, MESSAGE_SYNC);
    syncProtocol.writeUpdate(encoder, update);
    this.broadcastRaw(encoding.toUint8Array(encoder), excludeOrigin);
  }

  private broadcastRaw(message: Uint8Array, excludeOrigin: unknown): void {
    for (const ws of this.ctx.getWebSockets()) {
      if (ws === excludeOrigin) continue;
      try {
        ws.send(message);
      } catch {
        // Connection is closing/broken -- webSocketClose will clean it up.
      }
    }
  }

  // --- RPC methods, called from Server Actions in the Next.js app via
  // env.DOCUMENT_ROOM.getByName(documentId) -----------------------------

  async lock(): Promise<void> {
    this.roomReadOnly = true;
    await this.ctx.storage.put("readOnly", true);
    this.broadcastControlMessage();
  }

  async unlock(): Promise<void> {
    this.roomReadOnly = false;
    await this.ctx.storage.put("readOnly", false);
    this.broadcastControlMessage();
  }

  private broadcastControlMessage(): void {
    const encoder = encoding.createEncoder();
    encoding.writeVarUint(encoder, MESSAGE_CONTROL);
    encoding.writeVarUint(encoder, CONTROL_READONLY_CHANGED);
    encoding.writeVarUint(encoder, this.roomReadOnly ? 1 : 0);
    this.broadcastRaw(encoding.toUint8Array(encoder), null);
  }

  // --- WebSocket handling (Hibernation API) -----------------------------

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected a WebSocket upgrade request.", { status: 426 });
    }

    // Identity comes from trusted headers set by worker.ts *after* it
    // verifies the session cookie against PORTAL_DB -- never trust a
    // client-suppliable value here, this DO has no way to re-verify a
    // session itself.
    const userId = request.headers.get("X-Portal-User-Id") ?? "";
    const userName = request.headers.get("X-Portal-User-Name") ?? "Unknown";
    const color = request.headers.get("X-Portal-User-Color") ?? "#0F4D3A";
    if (!userId) return new Response("Missing identity.", { status: 400 });

    await this.ready;

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    this.ctx.acceptWebSocket(server);
    server.serializeAttachment({ userId, userName, color } satisfies ConnectionAttachment);

    // Let the new connection see who's already here -- awareness isn't
    // part of the sync handshake, so it wouldn't otherwise learn this.
    const existingClientIds = Array.from(this.awareness.getStates().keys());
    if (existingClientIds.length > 0) {
      const encoder = encoding.createEncoder();
      encoding.writeVarUint(encoder, MESSAGE_AWARENESS);
      encoding.writeVarUint8Array(encoder, awarenessProtocol.encodeAwarenessUpdate(this.awareness, existingClientIds));
      server.send(encoding.toUint8Array(encoder));
    }

    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer): Promise<void> {
    if (typeof message === "string") return; // protocol is binary-only
    await this.ready;

    const decoder = decoding.createDecoder(new Uint8Array(message));
    const messageType = decoding.readVarUint(decoder);

    if (messageType === MESSAGE_SYNC) {
      const syncMessageType = decoding.readVarUint(decoder);
      if (syncMessageType === syncProtocol.messageYjsSyncStep1) {
        const encoder = encoding.createEncoder();
        encoding.writeVarUint(encoder, MESSAGE_SYNC);
        syncProtocol.readSyncStep1(decoder, encoder, this.doc);
        // Per y-protocols' documented client-server pattern: reply with
        // step2, immediately followed by our own step1 (asking the client
        // for anything it has that we don't).
        syncProtocol.writeSyncStep1(encoder, this.doc);
        ws.send(encoding.toUint8Array(encoder));
      } else if (syncMessageType === syncProtocol.messageYjsSyncStep2) {
        // Defense in depth: refuse to apply a read-only connection's
        // update server-side, regardless of what the client sends -- not
        // just hidden client-side.
        if (!this.roomReadOnly) syncProtocol.readSyncStep2(decoder, this.doc, ws);
      } else if (syncMessageType === syncProtocol.messageYjsUpdate) {
        if (!this.roomReadOnly) syncProtocol.readUpdate(decoder, this.doc, ws);
      }
    } else if (messageType === MESSAGE_AWARENESS) {
      const update = decoding.readVarUint8Array(decoder);
      awarenessProtocol.applyAwarenessUpdate(this.awareness, update, ws);
    }
  }

  async webSocketClose(ws: WebSocket): Promise<void> {
    const clientIds = this.wsAwarenessClientIds.get(ws);
    if (clientIds && clientIds.size > 0) {
      awarenessProtocol.removeAwarenessStates(this.awareness, Array.from(clientIds), null);
    }
    this.wsAwarenessClientIds.delete(ws);
  }
}
