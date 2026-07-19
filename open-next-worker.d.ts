// Ambient declaration for the OpenNext-generated Worker entry point.
//
// `.open-next/worker.js` doesn't exist in a fresh checkout -- it's created
// by `npm run pages:build` (opennextjs-cloudflare), which runs `next build`
// as one of its own steps. Without this, `next build`'s own TypeScript
// check fails on worker.ts's import of that file before OpenNext ever gets
// a chance to generate it (a chicken-and-egg problem, not a real type
// error). This wildcard match covers the import regardless of the relative
// path it's imported from.
declare module "*.open-next/worker.js" {
  // Typed against ExportedHandler<Env>["fetch"] itself (rather than a
  // hand-rolled Request/Env signature) so it always matches whatever
  // `worker.ts`'s own `satisfies ExportedHandler<Env>` infers -- the
  // generated Workers runtime types are strict about which flavor of
  // `Request` (incoming vs. outgoing) is expected here.
  const handler: { fetch: NonNullable<ExportedHandler<Env>["fetch"]> };
  export default handler;
}
