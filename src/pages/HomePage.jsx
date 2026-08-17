import { useEffect, useRef } from 'react'
import { articles } from '../content/articles.js'
import { homeCinematic } from '../content/homeCinematic.js'
import HomeLoopHero from '../components/HomeLoopHero.jsx'
import MiniPlot from '../components/MiniPlot.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SmartLink from '../components/SmartLink.jsx'
import { SystemsMiniPlot } from '../components/SystemsComplexity.jsx'

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>
}

function AtlasArchive() {
  const railRef = useRef(null)

  const moveRail = (direction) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector('.home-atlas-card')
    const distance = card ? card.getBoundingClientRect().width + 18 : rail.clientWidth * 0.8
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    rail.scrollBy({ left: direction * distance, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section className="home-atlas-index" id="atlases" aria-labelledby="home-atlas-index-title">
      <header className="home-section-label">
        <span>Atlas index</span>
        <span>{articles.length} published {articles.length === 1 ? 'exhibit' : 'exhibits'} · newest first</span>
      </header>

      <div className="home-atlas-index__intro">
        <div>
          <span>Every article, kept in view</span>
          <h2 id="home-atlas-index-title">The complete collection.</h2>
        </div>
        <div className="home-atlas-index__controls" aria-label="Move through the atlas index">
          <button type="button" onClick={() => moveRail(-1)} aria-label="Previous atlas">←</button>
          <button type="button" onClick={() => moveRail(1)} aria-label="Next atlas">→</button>
        </div>
      </div>

      <div
        className="home-atlas-rail"
        ref={railRef}
        role="region"
        aria-label={`All ${articles.length} published atlases`}
        tabIndex="0"
      >
        {articles.map((article, index) => {
          const isSystemsAtlas = article.kind === 'systems-complexity'
          return (
            <article className="home-atlas-card" style={{ '--accent': article.accent }} key={article.slug}>
              <SmartLink href={`/stories/${article.slug}`} aria-label={`Open ${article.title}`}>
                <div className="home-atlas-card__topline">
                  <span>Exhibit {article.number}</span>
                  <span>{index === 0 ? 'Latest' : article.date}</span>
                </div>
                <div className="home-atlas-card__visual">
                  {isSystemsAtlas ? <SystemsMiniPlot /> : <MiniPlot />}
                </div>
                <div className="home-atlas-card__body">
                  <span>{article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{article.hook}</p>
                  <small>{article.cardNote}</small>
                </div>
                <footer>
                  <span>{article.readTime}</span>
                  <strong>Open atlas <Arrow /></strong>
                </footer>
              </SmartLink>
            </article>
          )
        })}
      </div>
      <p className="home-atlas-index__hint">Scroll, swipe, or use the arrow controls to move through the collection.</p>
    </section>
  )
}

export default function HomePage() {
  const featured = articles[0]
  const isSystemsAtlas = featured.kind === 'systems-complexity'

  useEffect(() => {
    document.title = "That's Interesting — Ideas become interesting when they connect"
  }, [])

  return (
    <div className="site-shell home-page home-page--field" style={{ '--article-accent': '#d9ff5b' }}>
      <SiteHeader />

      <main>
        <HomeLoopHero experience={homeCinematic} />

        <section className="home-editorial" id="about" aria-labelledby="home-editorial-title">
          <header className="home-section-label">
            <span>How the publication works</span>
            <span>01</span>
          </header>
          <div className="home-editorial__body">
            <h2 id="home-editorial-title">We follow an interesting thought until the evidence changes what we see.</h2>
            <div className="home-editorial__notes">
              <p>
                Every exhibit begins with a thought worth following: a question, comparison, contradiction, or pattern that refuses to stay small. We research it across disciplines, test the first assumption against evidence, and keep going when the answer becomes less tidy.
              </p>
              <p>
                The result is part investigation and part visual story. The goal is not to manufacture certainty; it is to show how curiosity becomes a researched point of view—and let the reader see the reasoning that got us there.
              </p>
            </div>
          </div>
        </section>

        <section className="home-current" id="latest" aria-labelledby="home-current-title">
          <header className="home-section-label">
            <span id="home-current-title">Current exhibit</span>
            <span>One story, considered closely</span>
          </header>

          <article className="home-exhibit" style={{ '--accent': featured.accent }}>
            <SmartLink className="home-exhibit__visual" href={`/stories/${featured.slug}`} aria-label={`Enter ${featured.title}`}>
              <span className="home-exhibit__number">{featured.number}</span>
              {isSystemsAtlas ? <SystemsMiniPlot /> : <MiniPlot />}
              <span className="home-exhibit__caption">{isSystemsAtlas ? 'Paths × state × trust' : 'Rigor × mid-career pay'}</span>
            </SmartLink>
            <div className="home-exhibit__copy">
              <div className="home-exhibit__meta">
                <span>{featured.category}</span>
                <span>{featured.readTime}</span>
              </div>
              <h2>{featured.title}</h2>
              <p className="home-exhibit__subtitle">{featured.italicTitle}</p>
              <p className="home-exhibit__dek">{featured.hook}</p>
              <SmartLink className="home-exhibit__link" href={`/stories/${featured.slug}`}>
                Open the atlas <Arrow />
              </SmartLink>
            </div>
          </article>
        </section>

        <AtlasArchive />
      </main>

      <SiteFooter />
    </div>
  )
}
