# Simulationen

Sammlung interaktiver Simulationen als Handy-App (PWA). Einmal installiert, läuft alles
**lokal auf dem Gerät und ohne Internet**. Es gibt keinen Server und keine Datenübertragung.

| Bereich | Simulation | Datei | Ursprungsdatei |
|---|---|---|---|
| Technische Mechanik | Balken-Rechner | `sims/balken.html` | `TM_Balken-Rechner.html` |
| Technische Mechanik | Fachwerk · 4 Stäbe | `sims/fachwerk-4-staebe.html` | `Fachwerk-Rechner_FOSBOSKempten.html` |
| Technische Mechanik | Fachwerk · Hallenbinder | `sims/fachwerk-hallenbinder.html` | `Fachwerk-Rechner-Hallenbinder.html` |
| Physik | Satellitenbahnen | `sims/satellitenbahnen.html` | `Satellitenbahnen_Simulation.html` |
| Mathematik | Kletterwand | `sims/kletterwand.html` | `kletterwand-3d_mathe-Nt_13_2025.html` |

Die Ursprungsdateien bleiben im Ordner liegen, werden aber nicht hochgeladen (`.gitignore`).
Änderungen gehören ab jetzt in `sims/`.

## Aufbau

| Pfad | Zweck |
|---|---|
| `index.html` | Übersicht, nach Fach gegliedert |
| `sims/` | die Simulationen, jede eine eigenständige Seite |
| `app/shell.css`, `app/shell.js` | gemeinsame Kopfleiste, Handy-Anordnung, Offline-Aktivierung |
| `sw.js` | Service Worker: legt alle Dateien auf dem Gerät ab |
| `manifest.json`, `icons/` | App-Name, Farben, Symbol |
| `assets/fonts/` | Schriften der Satellitenbahnen (SIL Open Font License) |
| `vendor/` | PptxGenJS 4.0.1 für den PowerPoint-Export des Balken-Rechners (MIT-Lizenz) |

## Veröffentlichen und installieren

1. Auf github.com ein öffentliches Repository `Simulationen` anlegen und den Ordner hochladen.
2. **Settings → Pages**: Branch `main`, Ordner `/ (root)`, **Save**.
3. Nach ein bis zwei Minuten `https://langphysik.github.io/Simulationen/` auf dem Handy öffnen.
4. **Android (Chrome):** Menü ⋮ → *App installieren*.
   **iPhone (Safari):** Teilen → *Zum Home-Bildschirm*.

Ist unten in der Übersicht der grüne Punkt zu sehen, liegt alles auf dem Gerät.

## Nach Änderungen

In `sw.js` die Versionsnummer hochzählen (`simulationen-v1` → `-v2`). Sonst behalten
installierte Geräte die alte Fassung. Bei bestehender Internetverbindung holt sich die App
die neue Version im Hintergrund und zeigt sie beim nächsten Öffnen an.

## Neue Simulation ergänzen

1. HTML-Datei nach `sims/` legen. Im `<head>` den Block mit `../app/shell.css` und
   `../app/shell.js` aus einer vorhandenen Simulation übernehmen, direkt nach `<body>` die Zeile
   `<nav class="appbar">`.
2. In `index.html` eine Karte im passenden Fach ergänzen.
3. In `sw.js` die Datei in die Liste `FILES` eintragen und die Versionsnummer hochzählen.

Soll die Zeichnung auf dem Handy oben stehen bleiben: `<body class="stick-stage">` setzen und
die Zeichnung in ein Element mit der Klasse `stage` legen.

Die Simulationen dürfen keine Dateien aus dem Internet nachladen, sonst fehlen sie offline.
