"use client";

import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
import * as syncProtocol from "y-protocols/sync";
import * as awarenessProtocol from "y-protocols/awareness";
import * as Y from "yjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitRichTextForReviewAction } from "@/app/portal/(app)/documents/actions";
import { EditorToolbar } from "@/components/portal/EditorToolbar";
import { FontSize } from "@/lib/tiptapFontSize";

// Hand-wired WebSocket provider speaking the same message protocol as
// documentRoom.ts (MESSAGE_SYNC=0, MESSAGE_AWARENESS=1, MESSAGE_CONTROL=2)
// -- not the `y-websocket` package's client, since the server is a custom
// Durable Object, not a generic y-websocket server. See plan, section B.
const MESSAGE_SYNC = 0;
const MESSAGE_AWARENESS = 1;
const MESSAGE_CONTROL = 2;
const CONTROL_READONLY_CHANGED = 0;

const CURSOR_COLORS = ["#0F4D3A", "#234A6F", "#C47A52", "#7A3B69", "#2B7A78", "#8A5A2B"];
function colorForUserId(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) hash = (hash * 31 + userId.charCodeAt(i)) >>> 0;
  return CURSOR_COLORS[hash % CURSOR_COLORS.length];
}

type PresenceUser = { name: string; color: string };

function useDocumentRoomConnection(
  documentId: string,
  doc: Y.Doc,
  awareness: awarenessProtocol.Awareness,
  onReadOnlyChange: (readOnly: boolean) => void,
  onLocalEdit: () => void,
) {
  const [connected, setConnected] = useState(false);
  const [presence, setPresence] = useState<PresenceUser[]>([]);

  useEffect(() => {
    let closedByCleanup = false;
    let ws: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;

    function sendSyncStep1() {
      const encoder = encoding.createEncoder();
      encoding.writeVarUint(encoder, MESSAGE_SYNC);
      syncProtocol.writeSyncStep1(encoder, doc);
      ws?.send(encoding.toUint8Array(encoder));
    }

    function connect() {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      ws = new WebSocket(`${protocol}//${window.location.host}/portal/api/documents/${documentId}/room`);
      ws.binaryType = "arraybuffer";

      ws.addEventListener("open", () => {
        setConnected(true);
        sendSyncStep1();
        // Broadcast our own presence immediately on connect.
        const localState = awareness.getLocalState();
        if (localState) {
          const encoder = encoding.createEncoder();
          encoding.writeVarUint(encoder, MESSAGE_AWARENESS);
          encoding.writeVarUint8Array(
            encoder,
            awarenessProtocol.encodeAwarenessUpdate(awareness, [doc.clientID]),
          );
          ws?.send(encoding.toUint8Array(encoder));
        }
      });

      ws.addEventListener("message", (event) => {
        const decoder = decoding.createDecoder(new Uint8Array(event.data as ArrayBuffer));
        const messageType = decoding.readVarUint(decoder);

        if (messageType === MESSAGE_SYNC) {
          const encoder = encoding.createEncoder();
          encoding.writeVarUint(encoder, MESSAGE_SYNC);
          const syncMessageType = syncProtocol.readSyncMessage(decoder, encoder, doc, "remote");
          if (syncMessageType === syncProtocol.messageYjsSyncStep1 && encoding.length(encoder) > 1) {
            ws?.send(encoding.toUint8Array(encoder));
          }
        } else if (messageType === MESSAGE_AWARENESS) {
          const update = decoding.readVarUint8Array(decoder);
          awarenessProtocol.applyAwarenessUpdate(awareness, update, "remote");
          const states = Array.from(awareness.getStates().entries())
            .filter(([clientId]) => clientId !== doc.clientID)
            .map(([, state]) => state?.user)
            .filter((user): user is PresenceUser => Boolean(user));
          setPresence(states);
        } else if (messageType === MESSAGE_CONTROL) {
          const controlType = decoding.readVarUint(decoder);
          if (controlType === CONTROL_READONLY_CHANGED) {
            onReadOnlyChange(decoding.readVarUint(decoder) === 1);
          }
        }
      });

      ws.addEventListener("close", () => {
        setConnected(false);
        if (!closedByCleanup) reconnectTimer = setTimeout(connect, 2000);
      });

      ws.addEventListener("error", () => ws?.close());
    }

    function sendUpdate(update: Uint8Array, origin: unknown) {
      if (origin === "remote") return; // don't echo back what we just received
      onLocalEdit();
      const encoder = encoding.createEncoder();
      encoding.writeVarUint(encoder, MESSAGE_SYNC);
      syncProtocol.writeUpdate(encoder, update);
      if (ws?.readyState === WebSocket.OPEN) ws.send(encoding.toUint8Array(encoder));
    }

    function sendAwarenessUpdate({ added, updated, removed }: { added: number[]; updated: number[]; removed: number[] }, origin: unknown) {
      if (origin === "remote") return;
      const changed = added.concat(updated, removed);
      const encoder = encoding.createEncoder();
      encoding.writeVarUint(encoder, MESSAGE_AWARENESS);
      encoding.writeVarUint8Array(encoder, awarenessProtocol.encodeAwarenessUpdate(awareness, changed));
      if (ws?.readyState === WebSocket.OPEN) ws.send(encoding.toUint8Array(encoder));
    }

    doc.on("update", sendUpdate);
    awareness.on("update", sendAwarenessUpdate);
    connect();

    return () => {
      closedByCleanup = true;
      clearTimeout(reconnectTimer);
      doc.off("update", sendUpdate);
      awareness.off("update", sendAwarenessUpdate);
      ws?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);

  return { connected, presence };
}

// Optimistic save-status indicator: flips to "Saving..." on every local
// edit, back to "Saved" after a short quiet period. The protocol has no
// application-level ack, so this mirrors what most collaborative editors
// actually show (Google Docs' own indicator is similarly optimistic, not a
// strict per-keystroke DB-commit confirmation).
function useSaveStatus() {
  const [status, setStatus] = useState<"saved" | "saving">("saved");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const markEdited = () => {
    setStatus("saving");
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus("saved"), 800);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return { status, markEdited };
}

function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function ExportMenu({ editor, title }: { editor: Editor; title: string }) {
  const [open, setOpen] = useState(false);
  const safeTitle = title.replace(/[^a-zA-Z0-9._ -]/g, "_") || "document";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-md border border-charcoal/20 px-3 py-1.5 font-body text-sm text-charcoal hover:border-evergreen"
      >
        Export &#9662;
      </button>
      {open ? (
        <div className="absolute right-0 z-10 mt-1 w-48 rounded-md border border-charcoal/10 bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={() => {
              downloadFile(
                `${safeTitle}.html`,
                `<!doctype html><meta charset="utf-8"><title>${title}</title>${editor.getHTML()}`,
                "text/html",
              );
              setOpen(false);
            }}
            className="block w-full px-3 py-2 text-left font-body text-sm text-charcoal hover:bg-warmStone"
          >
            Download as HTML
          </button>
          <button
            type="button"
            onClick={() => {
              downloadFile(`${safeTitle}.txt`, editor.getText(), "text/plain");
              setOpen(false);
            }}
            className="block w-full px-3 py-2 text-left font-body text-sm text-charcoal hover:bg-warmStone"
          >
            Download as text
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.print();
            }}
            className="block w-full px-3 py-2 text-left font-body text-sm text-charcoal hover:bg-warmStone"
          >
            Print / Save as PDF
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function CollaborativeEditor({
  documentId,
  documentTitle,
  userId,
  userName,
  initialReadOnly,
}: {
  documentId: string;
  documentTitle: string;
  userId: string;
  userName: string;
  initialReadOnly: boolean;
}) {
  const doc = useMemo(() => new Y.Doc(), [documentId]);
  const awareness = useMemo(() => new awarenessProtocol.Awareness(doc), [doc]);
  const [readOnly, setReadOnly] = useState(initialReadOnly);
  const { status: saveStatus, markEdited } = useSaveStatus();

  useEffect(() => {
    awareness.setLocalStateField("user", { name: userName, color: colorForUserId(userId) } satisfies PresenceUser);
  }, [awareness, userId, userName]);

  const { connected, presence } = useDocumentRoomConnection(documentId, doc, awareness, setReadOnly, markEdited);

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({ undoRedo: false }), // Yjs handles undo/redo history itself
        Collaboration.configure({ document: doc }),
        CollaborationCaret.configure({ provider: { awareness } }),
        Underline,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Link.configure({ openOnClick: false, autolink: true }),
        FontSize,
      ],
      editable: !readOnly,
      immediatelyRender: false,
    },
    [doc, readOnly],
  );

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3 font-body text-xs text-charcoal/50">
          <span>{connected ? (saveStatus === "saving" ? "Saving..." : "All changes saved") : "Reconnecting..."}</span>
          {presence.length > 0 ? (
            <div className="flex items-center -space-x-1.5">
              {presence.map((user, i) => (
                <span
                  key={i}
                  title={user.name}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-xs font-semibold text-white"
                  style={{ backgroundColor: user.color }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        {editor ? <ExportMenu editor={editor} title={documentTitle} /> : null}
      </div>

      {readOnly ? (
        <p className="mb-2 rounded-md bg-copperAccent/10 px-3 py-2 font-body text-sm text-copperAccent">
          This document is under review and is read-only.
        </p>
      ) : null}

      {editor && !readOnly ? <EditorToolbar editor={editor} /> : null}

      <EditorContent
        editor={editor}
        className={`min-h-[400px] border border-charcoal/20 px-4 py-3 font-body text-charcoal [&_.ProseMirror]:min-h-[380px] [&_.ProseMirror]:outline-none [&_h1]:font-headline [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:font-headline [&_h2]:text-xl [&_h2]:font-bold [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-evergreen [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-charcoal/20 [&_blockquote]:pl-4 [&_blockquote]:italic ${
          readOnly ? "rounded-md" : "rounded-b-md"
        }`}
      />
      {!readOnly && editor ? <SubmitForReviewButton documentId={documentId} editor={editor} /> : null}
    </div>
  );
}

// Separate component (not inlined into the render above) because it needs
// its own submitting/error state without re-rendering the whole editor.
function SubmitForReviewButton({ documentId, editor }: { documentId: string; editor: Editor }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    setStatus("submitting");
    setErrorMessage("");
    try {
      // The editor's own serialization is the source of truth for the
      // review snapshot -- this is why HTML rendering doesn't need to live
      // in the Durable Object at all (no ProseMirror/DOM in that runtime).
      await submitRichTextForReviewAction(documentId, editor.getHTML(), editor.getText());
      router.refresh();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={handleSubmit}
        disabled={status === "submitting"}
        className="rounded-md bg-evergreen px-4 py-2 font-body text-sm font-semibold text-warmStone hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit for review"}
      </button>
      {status === "error" ? (
        <p className="mt-1 font-body text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
