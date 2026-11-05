/* App-Rahmen: Offline-Modus aktivieren, "Übersicht" verhält sich wie Zurück */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(new URL("../sw.js", document.currentScript.src)).catch(() => {});
}

document.addEventListener("click", e => {
  const link = e.target.closest && e.target.closest("[data-back]");
  if (!link || !document.referrer) return;
  /* Kam man von der Übersicht, zurückgehen statt neu öffnen: So bleibt der
     Verlauf kurz, und die Zurück-Taste verlässt die App von der Übersicht aus. */
  const from = new URL(document.referrer).pathname.replace(/index\.html$/, "");
  const home = new URL(link.href).pathname.replace(/index\.html$/, "");
  if (from === home) { e.preventDefault(); history.back(); }
});
