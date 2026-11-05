/* Service Worker: legt die ganze App auf dem Gerät ab, damit sie offline läuft.
   Nach jeder Änderung an einer Datei die Versionsnummer hochzählen. */
const CACHE = "simulationen-v2";
const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./app/shell.css",
  "./app/shell.js",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./sims/balken.html",
  "./sims/fachwerk-4-staebe.html",
  "./sims/fachwerk-hallenbinder.html",
  "./sims/satellitenbahnen.html",
  "./sims/kletterwand.html",
  "./vendor/pptxgen.bundle.js",
  "./assets/fonts/fonts.css",
  "./assets/fonts/barlow-semi-condensed-500.woff2",
  "./assets/fonts/barlow-semi-condensed-600.woff2",
  "./assets/fonts/ibm-plex-mono-400.woff2",
  "./assets/fonts/ibm-plex-mono-500.woff2",
  "./assets/fonts/ibm-plex-sans-400.woff2"
];

/* cache:"reload" umgeht den HTTP-Cache, sonst könnte eine neue Version alte Dateien übernehmen */
const store = () => caches.open(CACHE)
  .then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" }))));

self.addEventListener("install", e => {
  e.waitUntil(store().then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k.startsWith("simulationen-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Zuerst aus dem Gerät (startet sofort, auch ohne Netz), Netz nur als Rückfallebene */
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== self.location.origin) return;
  /* Andere Apps unter derselben Adresse können diesen Speicher löschen: beim Öffnen wiederherstellen */
  if (e.request.mode === "navigate") {
    e.waitUntil(caches.has(CACHE).then(ok => ok || store()).catch(() => {}));
  }
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).catch(() => {
      if (e.request.mode === "navigate") return caches.match("./index.html");
      return Response.error();
    }))
  );
});
