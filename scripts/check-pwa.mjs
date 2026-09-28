import { readFileSync, existsSync, readdirSync } from "node:fs";
import assert from "node:assert/strict";

const base = process.argv[2] || "/";
assert(/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(base), "Invalid expected base path");
const origin = "https://pwa-check.invalid";
const appUrl = `${origin}${base}`;
const sw = readFileSync("dist/sw.js", "utf8");
const manifest = JSON.parse(readFileSync("dist/manifest.webmanifest", "utf8"));
assert.equal(manifest.display, "standalone");
for (const field of ["id", "start_url", "scope"]) {
  assert.equal(manifest[field], base, `Manifest ${field} must match ${base}`);
}

// Resolve URLs as the browser does, catching assets that escape the Pages path.
function localAsset(value) {
  const url = new URL(value, appUrl);
  assert.equal(url.origin, origin, `External PWA asset: ${value}`);
  assert(url.pathname.startsWith(base), `Asset outside ${base}: ${value}`);
  const path = decodeURIComponent(url.pathname.slice(base.length));
  assert(existsSync(`dist/${path}`), `Missing asset: ${value}`);
  return path;
}

const cached = new Set(
  [...sw.matchAll(/url:"([^"]+)"/g)].map((match) => localAsset(match[1])),
);
const required = [
  "index.html",
  "manifest.webmanifest",
  ...manifest.icons.map((icon) => localAsset(icon.src)),
  ...readdirSync("dist/assets")
    .filter((path) => /\.(js|css|woff2)$/.test(path))
    .map((path) => `assets/${path}`),
];
for (const path of required) assert(cached.has(path), `Not precached: ${path}`);

const html = readFileSync("dist/index.html", "utf8");
assert(!/https?:\/\//.test(html), "Shell depends on external assets");
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const path = localAsset(match[1]);
  assert(cached.has(path), `Shell asset not precached: ${path}`);
}
const fallback = sw.match(/createHandlerBoundToURL\("([^"]+)"\)/);
assert(fallback, "Missing offline navigation fallback");
assert.equal(localAsset(fallback[1]), "index.html");
console.log(`PWA verified at ${base}: ${cached.size} cached assets; manifest, shell and offline fallback match the deployment path.`);
