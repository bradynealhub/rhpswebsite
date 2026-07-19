// Hand-maintained (unlike worker-configuration.d.ts, which `wrangler types`
// regenerates and would overwrite) augmentation of OpenNext's `CloudflareEnv`
// global interface -- this is what `getCloudflareContext().env` is typed as
// inside Next.js app code (route handlers, server components, server
// actions), as opposed to `Env`/`worker-configuration.d.ts`, which types
// `worker.ts`'s raw Workers-runtime bindings. Keep both in sync with
// wrangler.jsonc by hand.
import type { DocumentRoom } from "./documentRoom";

declare global {
  interface CloudflareEnv {
    PORTAL_DB: D1Database;
    // Shared secret with the separate RHT Scout Worker (rhtpscout.com) --
    // signs the SSO handoff token in lib/scoutSso.ts. Set via
    // `wrangler secret put PORTAL_SSO_SECRET` on both apps (same value).
    PORTAL_SSO_SECRET: string;
    // Uploaded file attachments (doc_type='file' documents). Never publicly
    // exposed -- only reachable through authenticated Route Handlers.
    PORTAL_FILES: R2Bucket;
    // One DO instance per richtext document (getByName(documentId)) --
    // Server Actions call .lock()/.unlock() on submit-for-review/reopen.
    // The actual WebSocket traffic never reaches Next.js at all; it's
    // intercepted in worker.ts before this binding is ever used from here.
    DOCUMENT_ROOM: DurableObjectNamespace<DocumentRoom>;
  }
}

export {};
