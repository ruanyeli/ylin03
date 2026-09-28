# IQuest-Q1 Project Page

React single-page project page bundled with Vite.

## Development

```bash
npm install
npm run dev
```

Use `npm run build` to produce the deployable `dist/` directory. Asset paths are relative, so `dist/` can be served from any sub-path.

To build and serve on port 8080 in one step (supports video seeking):

```bash
npm start
```

The project serves a single layout from `src/v2/`. Open the site directly; no version parameter is needed.

## Shared data

Numbers, tables, recordings, and demos live in `src/shared/` and are the single source for page content:

| File | Contents |
|---|---|
| `model.js` | model facts (parameters, context, scaling, architecture), RSI outcomes, cyber results |
| `benchmarks.js` | evaluation table (models, rows, sources, notes, harness assignments, pending list) |
| `cases.js` | R&D recordings, Lark scenarios, and the numbers quoted in the case write-ups |
| `demos.js` | frontend demos (interactive demo folder, recording, cover, category) |
| `rsiLoop.js`, `quickstart.js`, `links.js`, `citation.js` | RSI figure steps and dialogue, serving snippets, external links, citation |

Change a value there and the page updates. Every build also publishes the same data as `data/iquest-q1.json`.

v2 prose is in `src/v2/copy.jsx` and must interpolate shared values: `scripts/check-v2-numbers.mjs` runs during every build and fails if a shared number (e.g. `56.6`, `320B`) is typed into v2 by hand. Run it directly with `node scripts/check-v2-numbers.mjs`.

## Build options

- `SITE_URL=https://your.host/path/ npm run build` makes the share-card image (`og:image`) an absolute URL, which Feishu, WeChat, Slack, and X require.
- `VITE_EVAL_VIEWS=bars,dots,table npm run build` chooses which evaluation views v2 offers and in what order (`bars` = bar chart per benchmark, `dots` = dot plot, `table` = table). The first is the desktop default; phones open the table when it is offered. Default: the bar chart only, with no view switcher.
- `VITE_EVAL_EXPORTS=markdown,json npm run build` shows the “Copy as Markdown” and “Download data (JSON)” links under the v2 evaluation figure (either or both). Default: hidden. `data/iquest-q1.json` is published either way.
- `VITE_MEDIA_BASE=https://cdn.example.com/iquest/ npm run build` serves the recordings in `public/videos` from a CDN or object store instead of the site itself (upload the `videos/` folder under that prefix).

## Useful URLs

- `?lang=zh` / `?lang=en` — force a language.
- `?demo=<id>` — open the page on one recording or demo, e.g. `?demo=twin-primes`, `?demo=case-2`, `?demo=api-incident` (ids are in `src/shared/cases.js` and `src/shared/demos.js`).

## Videos

Recordings are **not in git** (`public/videos/` is ignored). Place them at these paths before building, or upload the same tree to a CDN and build with `VITE_MEDIA_BASE`. Posters and screenshots under `public/images/` are committed.

| Path under `public/videos/` | Source in `video_demo/` |
|---|---|
| `rd/rsi-run.mp4` | `rsi_demo_v3_0927.mov` |
| `rd/case-1.mp4` | `vibe-coding_demo-1_claude-code-rl-demo.mp4` (as is) |
| `rd/case-2.mp4` | `vibe-coding_demo-2_claude-code-rl-demo.mp4` (as is) |
| `rd/case-3.mp4` | `vibe-coding_demo-3_debug.mp4` (as is) |
| `office/api-incident-fast.mp4` | `LARK-V7-FAST-CLIPPED.mov` (letterbox cropped to 3398×1086, then 2560 px wide) |
| `frontend/aegean-garden.mp4` | `frontend_demo_zip/Aegean_Garden.zip` → `AegeanGarden_en_processed.mp4` |
| `frontend/inline4-engine.mp4` | `frontend_demo_zip/Inline4_Engine.zip` → `Inline4Engine_en_processed.mp4` |
| `frontend/three-bodies.mp4` | `frontend_demo_zip/ThreeBodies.zip` → `ThreeBodies_en_processed.mp4` |
| `frontend/twin-primes.mp4` | `frontend_demo_zip/TwinPrimes.zip` → `TwinPrimes_en_processed.mp4` |

Everything not marked "as is" was transcoded to web-friendly H.264 (max 1920 px wide, 30 fps, moov atom up front):

```bash
ffmpeg -i IN -vf "scale='min(1920,iw)':-2" -r 30 -c:v libx264 -preset medium -crf 23 \
  -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart OUT.mp4
```

## Source layout

- `src/main.jsx` — loads the v2 page
- `src/shared/` — numbers, tables, recordings, demos (see above)
- `src/lib/` — page hooks and helpers (language, media queries, share links, rich text)
- `src/v2/` — current layout: `App.jsx`, `Page.jsx`, `Sections.jsx`, `copy.jsx` (all prose), `components/`, `styles.css`
- `scripts/check-v2-numbers.mjs` — build guard for hand-typed numbers in v2
- `public/videos/{rd,office,frontend}` — demo recordings (not in git, see Videos)
- `public/images/{rd,office,frontend}` — poster frames and demo screenshots
- `public/og-cover.png` — 1200×630 share card
- `public/demos` — self-contained frontend demos opened from the page
- `backup/v0-static-2026-09-26/` — the original static page (not deployed)

Fonts (Source Serif 4 + Source Sans 3; SIL OFL) are self-hosted through `@fontsource-variable` packages, so the page does not depend on Google Fonts.
