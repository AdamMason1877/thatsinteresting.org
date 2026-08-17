# Cinematic publishing pipeline

Every published piece follows one production path:

**Research → Editorial framing → Visual concept → Cinematic generation → Article experience → Publish**

The website is the museum. Each article is an exhibit with its own visual language inside the shared publication identity.

## 1. Research

Collect the primary evidence, dates, units, source links, image rights, and the claim that can be defended. Record the sources in the article metadata before visual production begins.

## 2. Editorial framing

Write three things first:

- The title
- A one-line curiosity hook
- A short summary that promises what the reader will understand

The hook should contain tension. It is the handoff into the cinematic sequence.

## 3. Visual concept

Answer all four questions in `cinematic_concept`:

1. `assumption` — What does the reader probably believe at first?
2. `violation` — What fact or mechanism breaks that belief?
3. `transformation` — What visible change makes the break intuitive?
4. `final_image` — What image leaves the reader needing the explanation?

Then write three to five short scenes. Each scene needs a marker, headline, and one concise line of direction. The sequence should reveal the reason the subject is interesting, not merely show the subject.

## 4. Cinematic generation

All generated cinematic video uses **Runway with Seedance 2.5**. This is enforced by `src/content/publishingConfig.js` and `src/content/articleContract.js`; do not substitute another model during publication.

Choose the medium that explains the relationship best:

- Generated video for atmosphere, physical transformation, or impossible camera movement
- A frame sequence for precise scroll-controlled reveals
- A coded renderer for data, scale, systems, or diagrams
- Archival or macro media when authenticity carries the argument
- A hybrid when the concept crosses scales or modes

Export a poster frame and mobile treatment with every generated sequence. Add meaningful visual alt text that describes the conceptual reveal, not just the objects shown.

## 5. Article metadata template

Copy this object into the `articles` array in `src/content/articles.js`:

```js
defineArticle({
  slug: 'subject-slug',
  kind: 'field-note',
  number: '002',
  category: 'Science · Visual Explanation',
  kicker: 'A visual explanation · subject · era',
  title: 'The declarative title',
  italicTitle: 'an optional second movement',
  hook: 'One sentence with enough tension to make the visitor enter.',
  year_or_era: '2026',
  summary: 'A short editorial promise describing what the visitor will understand.',
  dek: 'The same or a slightly longer summary for cards and metadata.',
  body: [
    {
      label: '01 · The setup',
      title: 'A specific explanatory headline',
      paragraphs: ['First paragraph.', 'Optional second paragraph.'],
      module: null,
    },
    {
      label: '02 · The mechanism',
      title: 'What actually happens',
      paragraphs: ['The explanation.'],
      module: null,
    },
  ],
  sources: [
    { label: 'Source title · organization', url: 'https://example.com/source' },
  ],
  cinematic_concept: {
    assumption: 'The intuitive starting belief.',
    violation: 'The surprising fact or mechanism.',
    transformation: 'The visual change that makes the violation felt.',
    final_image: 'The last image before the explanation begins.',
    reveal: 'The editorial sentence that names why the contradiction matters.',
    scenes: [
      { marker: '01 · Assumption', title: 'Scene headline.', copy: 'Visual direction.' },
      { marker: '02 · Violation', title: 'Scene headline.', copy: 'Visual direction.' },
      { marker: '03 · Threshold', title: 'Scene headline.', copy: 'Visual direction.' },
    ],
  },
  cinematic_assets: {
    renderer: null,
    desktop_video: '/media/subject/desktop.mp4',
    captions: true,
    generated_with: 'runway',
    video_model: 'seedance-2.5',
    generation_status: 'complete',
    generation_brief: {
      ratio: '16:9',
      duration_seconds: 10,
      prompt: 'A precise visual prompt structured around the assumption, violation, transformation, and final image.',
      editorial_intent: 'The conceptual job this sequence must do.',
    },
  },
  poster_frame: '/media/subject/poster.webp',
  mobile_video: '/media/subject/mobile.mp4',
  desktop_frame_sequence: [],
  frame_count: 0,
  visual_alt_text: 'Describe the visual transformation and what it communicates.',
  published_at: '2026-08-16T09:00:00-04:00',
  date: 'August 16, 2026',
  readTime: '6 min read',
  author: 'The Interesting Desk',
  accent: '#70e1ff',
  cardNote: 'A compact line for The Index',
  methodology: {
    title: 'A note on interpretation.',
    copy: 'Scope, caveats, and limits.',
  },
})
```

For a frame sequence, set `desktop_frame_sequence` to the ordered asset URLs and make `frame_count` equal its length. For generated video, provide `cinematic_assets.desktop_video`; `mobile_video` is used at narrow widths. For a bespoke coded treatment, register its renderer in `CinematicExperience.jsx` and set `cinematic_assets.renderer` to that key.

## 6. Pre-publish gate

Do not publish until all of these are true:

- The hook and cinema articulate the same surprise
- The generated video model is exactly `seedance-2.5`
- The cinema has a clear assumption, violation, transformation, and final image
- The sequence works with sound off
- Mobile has an intentional treatment
- Reduced-motion visitors still receive the core reveal
- Visual alt text explains the conceptual transformation
- Every factual claim has a source
- Poster, video, and sequence paths resolve without errors
- The article contract passes `npm run build`
- The exhibit has been checked at mobile and desktop widths

Publishing is adding a complete exhibit object and its assets—not redesigning the page.
