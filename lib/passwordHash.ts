// PBKDF2-HMAC-SHA256 password hashing via the Workers runtime's native
// Web Crypto API -- no WASM dependency (argon2/scrypt would need one).
// See RHPS Portal plan, section A, for the rationale.
//
// Iteration count: OWASP's PBKDF2-SHA256 guidance recommends 210,000+, but
// workerd's crypto.subtle.deriveBits hard-caps PBKDF2 at 100,000 iterations
// and throws NotSupportedError above that (confirmed by a live 500 during
// implementation -- not documented anywhere at the time of writing). 100,000
// is therefore the real ceiling on this platform, not a choice. The stored
// hash format is self-describing (`pbkdf2$<iterations>$...`) specifically so
// this can be raised later without a migration if a future workerd release
// lifts the cap -- re-check that cap before ever raising this constant.
const ITERATIONS = 100_000;
const HASH_ALGORITHM = "SHA-256";
const KEY_LENGTH_BITS = 256;
const SALT_LENGTH_BYTES = 16;

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function deriveBits(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derived = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as BufferSource, iterations, hash: HASH_ALGORITHM },
    keyMaterial,
    KEY_LENGTH_BITS,
  );
  return new Uint8Array(derived);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

// Self-describing format (`pbkdf2$<iterations>$<salt>$<hash>`) so the
// iteration count can be bumped later without a schema change -- verify()
// re-derives using whatever count is stored on the row.
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH_BYTES));
  const hash = await deriveBits(password, salt, ITERATIONS);
  return `pbkdf2$${ITERATIONS}$${toBase64(salt)}$${toBase64(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;

  const iterations = Number(parts[1]);
  if (!Number.isInteger(iterations) || iterations <= 0) return false;

  const salt = fromBase64(parts[2]);
  const expectedHash = fromBase64(parts[3]);
  const actualHash = await deriveBits(password, salt, iterations);

  // Constant-time comparison -- a naive `===`/string compare on the decoded
  // bytes would leak timing information about how many leading bytes match.
  return timingSafeEqual(actualHash, expectedHash);
}
