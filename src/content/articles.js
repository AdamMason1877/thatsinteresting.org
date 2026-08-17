import { defineArticle } from './articleContract.js'

export const majorData = [
  { name: 'Chemical Engineering', short: 'Chem Eng.', rigor: 8.9, early: 85, mid: 135, group: 'stem', roles: 'Process engineer · materials engineer' },
  { name: 'Aerospace Engineering', short: 'Aerospace', rigor: 8.4, early: 85, mid: 130, group: 'stem', roles: 'Aerospace engineer · systems engineer' },
  { name: 'Physics', short: 'Physics', rigor: 8.4, early: 67, mid: 105, group: 'stem', roles: 'Research scientist · data scientist' },
  { name: 'Architecture', short: 'Architecture', rigor: 8.3, early: 60, mid: 91, group: 'culture', roles: 'Architect · urban designer' },
  { name: 'Electrical Engineering', short: 'Electrical Eng.', rigor: 8.0, early: 82, mid: 123, group: 'stem', roles: 'Electrical engineer · power systems' },
  { name: 'Chemistry', short: 'Chemistry', rigor: 7.9, early: 50, mid: 86, group: 'stem', roles: 'Chemist · lab manager' },
  { name: 'Mechanical Engineering', short: 'Mechanical Eng.', rigor: 7.7, early: 80, mid: 120, group: 'stem', roles: 'Mechanical engineer · product engineer' },
  { name: 'Biochemistry', short: 'Biochemistry', rigor: 7.6, early: 52, mid: 100, group: 'stem', roles: 'Research associate · lab scientist' },
  { name: 'Mathematics', short: 'Mathematics', rigor: 7.5, early: 70, mid: 100, group: 'stem', roles: 'Actuary · quantitative analyst' },
  { name: 'Computer Engineering', short: 'Computer Eng.', rigor: 7.2, early: 90, mid: 131, group: 'stem', roles: 'Hardware engineer · systems engineer' },
  { name: 'Civil Engineering', short: 'Civil Eng.', rigor: 7.1, early: 75, mid: 115, group: 'stem', roles: 'Civil engineer · construction PM' },
  { name: 'Computer Science', short: 'Computer Sci.', rigor: 6.5, early: 87, mid: 120, group: 'stem', roles: 'Software engineer · systems architect' },
  { name: 'Nursing', short: 'Nursing', rigor: 6.2, early: 70, mid: 87, group: 'professional', roles: 'Registered nurse · clinical specialist' },
  { name: 'Philosophy', short: 'Philosophy', rigor: 6.1, early: 52, mid: 80, group: 'culture', roles: 'Writer · policy analyst · law pathway' },
  { name: 'Economics', short: 'Economics', rigor: 5.7, early: 72, mid: 115, group: 'professional', roles: 'Economic analyst · consultant' },
  { name: 'Accounting', short: 'Accounting', rigor: 5.0, early: 68, mid: 97, group: 'professional', roles: 'Accountant · auditor · controller' },
  { name: 'Fine Arts', short: 'Fine Arts', rigor: 4.7, early: 45, mid: 72, group: 'culture', roles: 'Designer · illustrator · art director' },
  { name: 'Finance', short: 'Finance', rigor: 4.5, early: 70, mid: 112, group: 'professional', roles: 'Financial analyst · portfolio associate' },
  { name: 'Political Science', short: 'Political Sci.', rigor: 4.0, early: 52, mid: 100, group: 'culture', roles: 'Policy analyst · legislative aide' },
  { name: 'Psychology', short: 'Psychology', rigor: 3.8, early: 45, mid: 72, group: 'culture', roles: 'Case manager · HR specialist' },
  { name: 'Elementary Education', short: 'Education', rigor: 3.2, early: 45, mid: 55, group: 'culture', roles: 'Teacher · reading specialist' },
  { name: 'Journalism', short: 'Journalism', rigor: 3.0, early: 49, mid: 87, group: 'culture', roles: 'Reporter · editor · producer' },
  { name: 'Marketing', short: 'Marketing', rigor: 2.8, early: 60, mid: 100, group: 'professional', roles: 'Brand strategist · media planner' },
  { name: 'Communications', short: 'Communications', rigor: 2.4, early: 52, mid: 88, group: 'culture', roles: 'PR specialist · account executive' },
  { name: 'Criminal Justice', short: 'Criminal Justice', rigor: 2.3, early: 50, mid: 80, group: 'professional', roles: 'Officer · corrections specialist' },
]

const atlasBody = [
  {
    label: '01 · The map',
    title: 'Each rigor point is worth about $6,700 a year — but the fit is loose',
    paragraphs: [
      'Each dot is a major, placed by its rigor index across and mid-career median pay up. Dashed lines mark the field’s center, splitting it into four quadrants.',
      'The intriguing territory is upper left: majors such as marketing and political science that reach above-average wages without the field’s heaviest conceptual load.',
    ],
    module: 'scatter-atlas',
  },
  {
    label: '02 · The payoff over time',
    title: 'Where the salary curve bends: early vs. mid-career pay',
    paragraphs: [
      'The space between the light and bright dots is each major’s runway—how much the typical paycheck grows between the first jobs and peak-earning years.',
      'Engineering fields do not merely start higher. Many continue to compound. Political science and biochemistry, meanwhile, nearly double from modest beginnings.',
    ],
    module: 'runway-chart',
  },
  {
    label: '03 · The exchange rate',
    title: 'Where conceptual effort converts most efficiently',
    paragraphs: [
      'Divide mid-career pay by rigor and a different picture appears. Communications and marketing convert relatively gentle conceptual loads into solid salaries.',
      'Laboratory sciences sit near the other end, in part because their largest payoff often arrives only after a graduate degree.',
    ],
    module: 'exchange-bars',
  },
  {
    label: '04 · The ledger',
    title: 'All 25 majors, sortable',
    paragraphs: [
      'Select any column to reorder the table. Pay figures are median annual salaries in thousands of dollars; the value column divides mid-career pay by the rigor index.',
    ],
    module: 'major-table',
  },
]

export const articles = [
  defineArticle({
    slug: 'rigor-reward-atlas',
    kind: 'atlas',
    number: '001',
    category: 'Education · Data Atlas',
    kicker: 'An educational infographic · U.S. bachelor’s degrees · 2026 edition',
    title: 'The Rigor & Reward Atlas',
    italicTitle: 'what each major asks of you, and what it pays back',
    hook: 'Does choosing a harder major actually lead to a bigger paycheck?',
    year_or_era: '2026 edition',
    summary: 'Twenty-five common college majors, weighed two ways: how hard the core concepts are to master, and what graduates earn as their careers mature.',
    dek: 'Twenty-five common college majors, weighed two ways: how hard the core concepts are to master, and what graduates earn as their careers mature.',
    body: atlasBody,
    sources: [
      { label: 'Federal Reserve Bank of New York · The Labor Market for Recent College Graduates', url: 'https://www.newyorkfed.org/research/college-labor-market' },
      { label: 'U.S. Census Bureau · American Community Survey', url: 'https://www.census.gov/programs-surveys/acs' },
      { label: 'National Survey of Student Engagement · Annual Results', url: 'https://nsse.indiana.edu/research/annual-results/index.html' },
    ],
    cinematic_concept: {
      assumption: 'Academic difficulty and career reward should form a clean upward staircase.',
      violation: 'The relationship is real but loose: majors with similar rigor can land tens of thousands of dollars apart, while less conceptually demanding fields can outrun harder ones.',
      transformation: 'A perfect diagonal of glowing degree markers loosens into the real upward-trending scatterplot; the exceptions separate while the expected line remains as a ghost.',
      final_image: 'Twenty-five majors suspended as an upward-trending constellation around the faint line we expected to see.',
      reveal: 'Rigor shifts the odds. It does not set the outcome.',
      scenes: [
        { marker: '01 · The question', title: 'Does difficulty buy reward?', copy: 'The intuitive bargain is tidy: choose the harder path, expect the higher salary.' },
        { marker: '02 · The pattern', title: 'Mostly, yes.', copy: 'The real outcomes still rise overall. More rigorous majors generally earn more.' },
        { marker: '03 · The exceptions', title: 'But not at a fixed exchange rate.', copy: 'Architecture and aerospace are nearly equal in rigor—and almost $40,000 apart. Lower-rigor fields also rise unexpectedly high.' },
        { marker: '04 · The threshold', title: 'What does difficulty actually buy?', copy: 'The complete constellation holds both truths: rigor matters, but it does not determine the result.' },
      ],
    },
    cinematic_assets: {
      renderer: 'rigor-reward-hybrid',
      desktop_video: '/media/rigor-reward-atlas/desktop.mp4',
      captions: true,
      generated_with: 'runway',
      video_model: 'seedance-2.5',
      generation_status: 'complete',
      generation_ids: {
        desktop: '4461f703-343d-4465-ad52-cf62c1b6207f',
        mobile: '26bcef49-e619-42fb-b745-fce7e1df95f6',
      },
      generation_brief: {
        ratios: ['16:9', '9:16'],
        duration_seconds: 10,
        resolution: '720p',
        audio: false,
        prompt: `A dark editorial data space containing exactly 25 small luminous points. At first, the points sit along a clean rising diagonal, expressing the intuitive expectation that harder college majors should produce higher salaries. The composition feels precise, orderly and reassuring. The camera makes a slow, nearly imperceptible push forward.

The formation gradually loosens. Each point glides away from the perfect diagonal toward a different outcome. The points still retain a recognizable overall upward trend, but substantial variation appears around it. Keep the original diagonal visible as a faint ghost rather than destroying it.

Several points with nearly identical horizontal positions separate dramatically in height. A few cyan and violet points on the lower-rigor side rise unexpectedly high. On the high-rigor side, one violet point falls well below neighboring acid-green points. The transformation should make the viewer feel that the expected relationship is real but much less deterministic than it first appeared.

End on the complete irregular constellation: 25 glowing outcomes surrounding the faded line everyone expected to see. Deep black museum environment, restrained acid-green, cyan and violet illumination, sophisticated scientific visualization, subtle volumetric atmosphere, precise motion, elegant editorial composition, premium digital-exhibit aesthetic.

No people. No campuses. No classrooms. No diplomas. No money imagery. No stock footage. No icons. No logos. No legible typography. No generated labels. No decorative sci-fi interface.`,
        timing: {
          expected_diagonal: '0–2.5 seconds',
          formation_loosens: '2.5–5 seconds',
          exceptions_separate: '5–8 seconds',
          final_constellation: '8–10 seconds',
        },
        editorial_intent: 'More rigorous majors generally earn more, and the relationship is meaningful but imperfect. Difficulty does not convert into salary at a consistent rate: majors with nearly identical rigor can have dramatically different outcomes, while less rigorous majors can outperform much harder ones. Rigor matters, but it does not determine the result.',
        transition: 'Use generated video for the atmospheric opening, then crossfade into the authoritative coded scatterplot with exact positions, labels, values, the observed trend line, and the expected diagonal retained as a faint ghost.',
      },
    },
    poster_frame: '/media/rigor-reward-atlas/poster.webp',
    mobile_video: '/media/rigor-reward-atlas/mobile.mp4',
    desktop_frame_sequence: [],
    frame_count: 0,
    visual_alt_text: 'A perfect diagonal representing the expectation that harder college majors always pay more loosens into the real upward-trending scatterplot of 25 majors. Several majors with similar rigor separate dramatically in salary, showing that difficulty matters without determining the outcome.',
    published_at: '2026-08-16T09:00:00-04:00',
    date: 'August 16, 2026',
    readTime: '8 min read',
    author: 'The Interesting Desk',
    accent: '#d9ff5b',
    cardNote: '25 majors · one expected line · a field of exceptions',
    methodology: {
      title: 'This is a map, not a destiny.',
      copy: 'Rigor is a directional composite—not a judgment of intelligence, worth, or lived difficulty. Earnings medians hide differences in geography, occupation, experience, hours, and graduate education. Use the atlas to ask better questions, never to choose a life by a dot.',
    },
  }),
]

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug)
}
