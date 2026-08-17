import { useEffect, useState } from 'react'
import { articles } from '../content/articles.js'
import SmartLink from '../components/SmartLink.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import CinematicExperience from '../components/CinematicExperience.jsx'
import ScatterAtlas from '../components/ScatterAtlas.jsx'
import RunwayChart from '../components/RunwayChart.jsx'
import ExchangeBars from '../components/ExchangeBars.jsx'
import MajorTable from '../components/MajorTable.jsx'
import {
  ComplexityMap,
  ComplexityMetrics,
  ComplexityTable,
  DisciplineProfiles,
  IntegrationJunctions,
} from '../components/SystemsComplexity.jsx'

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight
      setProgress(available > 0 ? (window.scrollY / available) * 100 : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <div className="reading-progress" style={{ width: `${progress}%` }} />
}

function StoryHero({ article }) {
  return (
    <header className="story-hero" style={{ '--accent': article.accent }}>
      <div className="story-hero__issue" aria-hidden="true">EXHIBIT<br />{article.number}</div>
      <p className="story-category">{article.category}</p>
      <h1>
        {article.title}
        {article.italicTitle && <em>{article.italicTitle}</em>}
      </h1>
      <p className="story-hook">{article.hook}</p>
    </header>
  )
}

function ArticleIntroduction({ article }) {
  return (
    <section className="article-introduction content-wide">
      <div className="story-byline">
        <span className="author-mark">TI</span>
        <div>
          <strong>{article.author}</strong>
          <span><time dateTime={article.published_at}>{article.date}</time> · {article.readTime}</span>
        </div>
      </div>
      <p>{article.summary}</p>
      <div className="article-introduction__concept">
        <span>The premise</span>
        <strong>{article.cinematic_concept.reveal}</strong>
      </div>
    </section>
  )
}

function SectionIntro({ label, title, paragraphs = [] }) {
  return (
    <div className="section-intro">
      <p className="section-number">{label}</p>
      <h2>{title}</h2>
      {paragraphs.length > 0 && (
        <div className="section-copy">
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      )}
    </div>
  )
}

function MetricsStrip() {
  return (
    <div className="metrics-strip">
      <div><span>Correlation</span><strong>r = 0.64</strong><p>Rigor and pay move together, but only loosely.</p></div>
      <div><span>Value of +1 rigor</span><strong>+$6.7K</strong><p>The slope across the majors in this atlas.</p></div>
      <div><span>Steepest major</span><strong>Chem. Eng.</strong><p>Rigor 8.9, with the highest mid-career median.</p></div>
      <div><span>Widest pay gap</span><strong>$83K</strong><p>Chemical engineering versus elementary education.</p></div>
    </div>
  )
}

const storyModules = {
  'scatter-atlas': () => <><ScatterAtlas /><MetricsStrip /></>,
  'runway-chart': () => <RunwayChart />,
  'exchange-bars': () => <ExchangeBars />,
  'major-table': () => <MajorTable />,
  'complexity-map': () => <><ComplexityMap /><ComplexityMetrics /></>,
  'discipline-profiles': () => <DisciplineProfiles />,
  'integration-junctions': () => <IntegrationJunctions />,
  'complexity-table': () => <ComplexityTable />,
}

const evidenceKeys = {
  atlas: [
    <span key="rigor"><b>Rigor index</b> weekly study time + grading + abstraction</span>,
    <span key="pay"><b>Pay</b> NY Fed medians · 2024 Census data</span>,
    <span key="early"><b>Early career</b> ages 22–27</span>,
    <span key="mid"><b>Mid-career</b> ages 35–45</span>,
  ],
  'systems-complexity': [
    <span key="sample"><b>Field</b> 6 high-complexity concepts per discipline</span>,
    <span key="dimensions"><b>Dimensions</b> depth · integration · state · opacity · adversary</span>,
    <span key="scale"><b>Scale</b> editorial index from 1–10</span>,
    <span key="scope"><b>Scope</b> production-scale systems, not entry-level study</span>,
  ],
}

function StoryBody({ article }) {
  const evidence = evidenceKeys[article.kind]

  return (
    <>
      {evidence && (
        <section className="evidence-key content-wide" aria-label="Reading key">
          {evidence}
        </section>
      )}

      {article.body.map((section) => {
        const Module = storyModules[section.module]
        return (
          <section className="story-section content-wide" key={section.label}>
            <SectionIntro
              label={section.label}
              title={section.title}
              paragraphs={section.paragraphs}
            />
            {Module && <Module />}
          </section>
        )
      })}
    </>
  )
}

function MethodAndSources({ article }) {
  return (
    <aside className="method-note content-reading">
      <p className="section-number">A note on the numbers</p>
      <h2>{article.methodology?.title ?? 'Look closely, then look again.'}</h2>
      {article.methodology?.copy && <p>{article.methodology.copy}</p>}
      <div className="source-list">
        <span>Sources</span>
        {article.sources.map((source, index) => (
          <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
            <i>{String(index + 1).padStart(2, '0')}</i>
            {source.label}
            <b aria-hidden="true">↗</b>
          </a>
        ))}
      </div>
    </aside>
  )
}

function RelatedStories({ current }) {
  const related = articles.filter((item) => item.slug !== current.slug).slice(0, 2)
  if (related.length === 0) return null

  return (
    <section className="related-stories content-wide">
      <p className="section-number">Keep looking</p>
      <h2>Two more ways to see it.</h2>
      <div>
        {related.map((article) => (
          <SmartLink key={article.slug} href={`/stories/${article.slug}`} style={{ '--accent': article.accent }}>
            <span>{article.category}</span>
            <strong>{article.title}</strong>
            <i>↗</i>
          </SmartLink>
        ))}
      </div>
    </section>
  )
}

export default function StoryPage({ article }) {
  useEffect(() => {
    document.title = article ? `${article.title} — That's Interesting` : "Story not found — That's Interesting"
  }, [article])

  if (!article) {
    return (
      <div className="site-shell not-found">
        <SiteHeader minimal />
        <main><span>404</span><h1>Nothing to see here.<br /><em>Yet.</em></h1><SmartLink href="/">Return to the index →</SmartLink></main>
      </div>
    )
  }

  return (
    <div className="site-shell story-page" style={{ '--article-accent': article.accent }}>
      <ReadingProgress />
      <SiteHeader minimal />
      <main>
        <StoryHero article={article} />
        <CinematicExperience article={article} />
        <ArticleIntroduction article={article} />
        <StoryBody article={article} />
        <MethodAndSources article={article} />
        <RelatedStories current={article} />
      </main>
      <SiteFooter />
    </div>
  )
}
