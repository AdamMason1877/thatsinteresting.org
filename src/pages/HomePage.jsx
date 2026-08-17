import { useEffect } from 'react'
import { articles } from '../content/articles.js'
import SmartLink from '../components/SmartLink.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import MiniPlot from '../components/MiniPlot.jsx'

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>
}

function StoryCard({ article, index }) {
  return (
    <article className={`story-card story-card--${index + 1}`} style={{ '--accent': article.accent }}>
      <div className="story-card__topline">
        <span>Exhibit {article.number}</span>
        <span>{article.readTime}</span>
      </div>
      <SmartLink href={`/stories/${article.slug}`} className="story-card__link">
        <div className="story-card__visual" aria-hidden="true">
          <span className="story-card__orb story-card__orb--one" />
          <span className="story-card__orb story-card__orb--two" />
          <span className="story-card__rule" />
          <i className="story-card__cinema-label">Cinematic entry</i>
        </div>
        <p className="eyebrow">{article.category}</p>
        <h3>{article.title}</h3>
        <p>{article.cardNote}</p>
        <Arrow />
      </SmartLink>
    </article>
  )
}

export default function HomePage() {
  const featured = articles[0]

  useEffect(() => {
    document.title = "That's Interesting — A digital museum of ideas"
  }, [])

  return (
    <div className="site-shell home-page">
      <SiteHeader />

      <main>
        <section className="home-intro">
          <p className="edition-label">A continuously expanding digital museum · Edition 01</p>
          <h1>Make the world<br /><em>worth noticing.</em></h1>
          <p className="home-intro__dek">
            Research explains the idea. Cinema makes it felt. Interaction lets you discover it.
          </p>
          <a className="scroll-cue" href="#latest"><span>Enter the museum</span><i /></a>
        </section>

        <section className="featured" id="latest" style={{ '--accent': featured.accent }}>
          <div className="featured__copy">
            <div className="featured__meta">
              <span>Featured exhibit</span>
              <span>{featured.readTime}</span>
            </div>
            <p className="eyebrow">{featured.category}</p>
            <h2>{featured.title}:<br /><em>{featured.italicTitle}</em></h2>
            <p className="featured__dek">{featured.hook}</p>
            <SmartLink className="read-link" href={`/stories/${featured.slug}`}>
              Enter the exhibit <Arrow />
            </SmartLink>
          </div>
          <SmartLink className="featured__graphic" href={`/stories/${featured.slug}`} aria-label={`Enter ${featured.title}`}>
            <div className="featured__issue">EXHIBIT<br />NO. {featured.number}</div>
            <MiniPlot />
            <p>First, the line you expect.<br />Then, the exceptions.</p>
          </SmartLink>
        </section>

        <section className="signal-strip" aria-label="Highlights">
          <div><strong>25</strong><span>majors mapped</span></div>
          <div><strong>0.64</strong><span>rigor/pay correlation</span></div>
          <div><strong>$83K</strong><span>widest pay gap</span></div>
          <div><strong>∞</strong><span>reasons to look closer</span></div>
        </section>

        <section className="story-index" id="atlases">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The Index</p>
              <h2>A growing museum<br /><em>of surprising ideas.</em></h2>
            </div>
            <p>Every entry opens as its own exhibit: a cinematic threshold, an editorial argument, and a visual explanation built around the reason the subject is interesting.</p>
          </div>
          <div className="story-grid">
            {articles.length > 0 ? (
              articles.map((article, index) => <StoryCard key={article.slug} article={article} index={index} />)
            ) : (
              <div className="story-index__empty"><strong>The next curiosity is taking shape.</strong><span>New exhibits will appear here.</span></div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
