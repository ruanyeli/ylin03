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
npm start            # newest page version (v3)
npm run start:v1     # the previous layout (v1)
```

## Page versions

Each page layout lives in its own folder, `src/v1/`, `src/v2/`, …, and only the chosen one is loaded in the browser.

- **At startup:** `BLOG_VERSION=v1 npm run build` (or `npm run start:v1`) makes v1 the default. Without `BLOG_VERSION` the newest version is used. An unknown value fails the build.
- **At runtime, without rebuilding:** add `?v=v1`, `?v=v2`, or `?v=v3` to the URL.
- **Adding a version:** create the next `src/v<N>/App.jsx`; it is picked up automatically and becomes the default.

The v3 homepage uses a white, centered hero and card-based sections inspired by https://iquestlab.github.io/. It reuses v2 content, data, charts, demo controls, and language handling. The original editorial layout remains available at `?v=v2`.

## Shared data

Numbers, tables, recordings, and demos live in `src/shared/` and are the single source for every version:

| File | Contents |
|---|---|
| `model.js` | model facts (parameters, context, scaling, architecture), RSI outcomes, cyber results |
| `benchmarks.js` | evaluation table (models, rows, sources, notes, harness assignments, pending list) |
| `cases.js` | R&D recordings, Lark scenarios, and the numbers quoted in the case write-ups |
| `demos.js` | frontend demos (interactive demo folder, recording, cover, category) |
| `rsiLoop.js`, `quickstart.js`, `links.js`, `citation.js` | RSI figure steps and dialogue, serving snippets, external links, citation |

Change a value there and both layouts update. Every build also publishes the same data as `data/iquest-q1.json`.

v2 prose is in `src/v2/copy.jsx` and must interpolate shared values: `scripts/check-v2-numbers.mjs` runs during every build and fails if a shared number (e.g. `56.6`, `320B`) is typed into v2 by hand. Run it directly with `node scripts/check-v2-numbers.mjs`.

## Build options

- `SITE_URL=https://your.host/path/ npm run build` makes the share-card image (`og:image`) an absolute URL, which Feishu, WeChat, Slack, and X require.
- `VITE_EVAL_VIEWS=bars,dots,table npm run build` chooses which evaluation views v2 offers and in what order (`bars` = bar chart per benchmark, `dots` = dot plot, `table` = table). The first is the desktop default; phones open the table when it is offered. Default: all three, bar chart first.
- `VITE_EVAL_EXPORTS=markdown,json npm run build` shows the “Copy as Markdown” and “Download data (JSON)” links under the v2 evaluation figure (either or both). Default: hidden. `data/iquest-q1.json` is published either way.
- `VITE_MEDIA_BASE=https://cdn.example.com/iquest/ npm run build` serves the recordings in `public/videos` from a CDN or object store instead of the site itself (upload the `videos/` folder under that prefix).

## Useful URLs

- `?v=v1` / `?v=v2` / `?v=v3` — choose the page version.
- `?lang=zh` / `?lang=en` — force a language.
- `?demo=<id>` — open the page on one recording or demo, e.g. `?demo=twin-primes`, `?demo=case-2`, `?demo=api-incident` (ids are in `src/shared/cases.js` and `src/shared/demos.js`).
- `?fonts=1` (v1 only) — compare headline fonts in place. The font is set by `--font-display` in `src/v1/styles/global.css`; v2's headline font is set at the top of `src/v2/styles.css`.

## Videos

Web-ready MP4 recordings under `public/videos/` are committed and copied into `dist/videos/` by Vite, so GitHub Pages deploys them with the site. Raw source material under `video_demo/` remains ignored. To serve recordings from a CDN instead, upload the same tree and build with `VITE_MEDIA_BASE`. Posters and screenshots under `public/images/` are committed.

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

- `src/main.jsx` — picks the page version and loads it
- `src/shared/` — numbers, tables, recordings, demos (see above)
- `src/lib/` — hooks and helpers used by every version (language, media queries, share links, rich text)
- `src/v1/` — previous layout: `App.jsx`, `pages/`, `components/`, `data/` (prose), `styles/`
- `src/v2/` — current layout: `App.jsx`, `Page.jsx`, `Sections.jsx`, `copy.jsx` (all prose), `components/`, `styles.css`
- `scripts/check-v2-numbers.mjs` — build guard for hand-typed numbers in v2
- `public/videos/{rd,office,frontend}` — demo recordings (committed for GitHub Pages, see Videos)
- `public/images/{rd,office,frontend}` — poster frames and demo screenshots
- `public/og-cover.png` — 1200×630 share card
- `public/demos` — self-contained frontend demos opened from the page
- `backup/v0-static-2026-09-26/` — the original static page (not deployed); the v1 React layout is also tagged `blog-v1`

Fonts (v1: Newsreader + Source Sans 3; v2: Source Serif 4 + Source Sans 3; all SIL OFL) are self-hosted through `@fontsource-variable` packages, so the page does not depend on Google Fonts.
