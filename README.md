# That's Interesting

A continuously expanding digital museum where each idea receives its own exhibit. Every article combines editorial framing, a bespoke cinematic threshold, structured explanation, interactive evidence, and sources.

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Publish another exhibit

Articles live in `src/content/articles.js` and are checked against the contract in `src/content/articleContract.js`. Each article supplies its editorial body, source list, cinematic concept, assets, accessibility description, and publication metadata.

Generated cinematic video is pinned globally to **Seedance 2.5** in `src/content/publishingConfig.js`; the article contract rejects any exhibit configured with a different video model.

The cinematic renderer in `src/components/CinematicExperience.jsx` chooses the strongest available treatment automatically. A fully coded renderer can deliver the entire opening without generated media:

1. A bespoke coded renderer named by `cinematic_assets.renderer` (including video-free exhibits)
2. A scroll-scrubbed `desktop_frame_sequence`
3. Responsive generated video through `mobile_video` and `cinematic_assets.desktop_video`
4. A metadata-driven abstract concept treatment as the fallback

The complete research-to-publish workflow and copy-ready metadata template are documented in [docs/PUBLISHING_PIPELINE.md](docs/PUBLISHING_PIPELINE.md).

## Structure

- `src/content/articles.js` — article registry, editorial blocks, sources, and cinematic briefs
- `src/content/articleContract.js` — required publishing contract and validation
- `src/content/publishingConfig.js` — enforced Runway provider and Seedance 2.5 model policy
- `src/components/CinematicExperience.jsx` — data-driven cinematic router and scroll choreography
- `src/pages/HomePage.jsx` — The Index, generated from the article registry
- `src/pages/StoryPage.jsx` — shared exhibit frame and metadata-driven body renderer
- `src/components/` — reusable navigation, linking, cinematic, and infographic modules
- `src/styles.css` — publication identity, exhibit styling, animation, and responsive behavior

The current flagship uses a coded data-cinema: an expected rigor/pay line fractures into the real 25-major scatterplot before the written explanation begins.
