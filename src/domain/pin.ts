import type { ParentSettings } from "./types";
const hex = (b: ArrayBuffer) =>
  Array.from(new Uint8Array(b))
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("");
async function derive(pin: string, salt: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(pin),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  return hex(
    await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: new TextEncoder().encode(salt),
        iterations: 100000,
        hash: "SHA-256",
      },
      key,
      256,
    ),
  );
}
export async function createPin(pin: string) {
  if (!/^\d{4,8}$/.test(pin)) throw Error("Usa de 4 a 8 números.");
  const salt = hex(crypto.getRandomValues(new Uint8Array(16)).buffer);
  return { pinSalt: salt, pinHash: await derive(pin, salt) };
}
export async function verifyPin(pin: string, settings: ParentSettings) {
  return (
    !!settings.pinHash &&
    !!settings.pinSalt &&
    (await derive(pin, settings.pinSalt)) === settings.pinHash
  );
}
