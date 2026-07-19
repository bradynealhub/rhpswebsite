import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Signed handoff token for single sign-on into the separate RHT Scout app
// (rhtpscout.com, a standalone Cloudflare Worker with its own single
// shared-bearer-token auth -- see that repo's src/index.ts). RHPS portal is
// the only source of truth for who's allowed in: a Founding Operator or
// platform admin clicking through mints a short-lived signed token here;
// RHT Scout's /sso route verifies it with the same shared secret
// (PORTAL_SSO_SECRET, set as a Worker secret on both apps) and logs them
// straight into its existing dashboard. 60s validity limits replay risk
// without needing a shared single-use token store between two independent
// Workers/databases.
const TOKEN_VALIDITY_MS = 60_000;

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmacSign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toBase64Url(new Uint8Array(signature));
}

export async function createScoutSsoToken(user: { email: string; name: string }): Promise<string> {
  const { env } = await getCloudflareContext({ async: true });
  const secret = env.PORTAL_SSO_SECRET;

  const payload = JSON.stringify({
    email: user.email,
    name: user.name,
    exp: Date.now() + TOKEN_VALIDITY_MS,
  });
  const payloadB64 = toBase64Url(new TextEncoder().encode(payload));
  const signature = await hmacSign(payloadB64, secret);

  return `${payloadB64}.${signature}`;
}
