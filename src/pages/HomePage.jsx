import { useEffect } from 'react'
import { articles } from '../content/articles.js'
import { homeCinematic } from '../content/homeCinematic.js'
import HomeLoopHero from '../components/HomeLoopHero.jsx'
import MiniPlot from '../components/MiniPlot.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SmartLink from '../components/SmartLink.jsx'

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>
}

export default function HomePage() {
  const featured = articles[0]

  useEffect(() => {
    document.title = "That's Interesting — Ideas become interesting when they connect"
  }, [])

  return (
    <div className="site-shell home-page home-page--field" style={{ '--article-accent': '#d9ff5b' }}>
      <SiteHeader />

      <main>
        <HomeLoopHero experience={homeCinematic} />

        <section className="home-thesis" id="about" aria-labelledby="home-thesis-title">
          <div className="home-thesis__index">
            <span>Our organizing idea</span>
            <strong>∞</strong>
          </div>
          <div className="home-thesis__copy">
            <p className="eyebrow">That’s Interesting</p>
            <h2 id="home-thesis-title">Interesting isn’t a thing.<br /><em>It’s a relationship.</em></h2>
            <p>
              A fact becomes more revealing beside another fact. A familiar question changes when a distant field answers it. This is a museum for those connections: part research desk, part cinema, part atlas.
            </p>
            <a className="read-link" href="#latest">
              Find the first connection <span className="arrow" aria-hidden="true">↓</span>
            </a>
          </div>
          <ol className="home-thesis__steps" aria-label="How the museum works">
            <li><span>01</span><strong>Notice</strong><p>Begin with the idea everyone thinks they know.</p></li>
            <li><span>02</span><strong>Connect</strong><p>Place it beside evidence from somewhere unexpected.</p></li>
            <li><span>03</span><strong>See again</strong><p>Leave with a new relationship, not just another fact.</p></li>
          </ol>
        </section>

        <section className="home-exhibit-intro" id="latest">
          <p>One thought in the field</p>
          <h2>The museum begins here.</h2>
          <span>Each exhibit is its own destination. Enter when a connection catches you.</span>
        </section>

        <section className="featured home-featured" id="atlases" style={{ '--accent': featured.accent }} aria-labelledby="featured-title">
          <div className="featured__copy">
            <div className="featured__meta">
              <span>Exhibit no. {featured.number}</span>
              <span>{featured.readTime}</span>
            </div>
            <p className="eyebrow">{featured.category}</p>
            <h2 id="featured-title">{featured.title}:<br /><em>{featured.italicTitle}</em></h2>
            <p className="featured__dek">{featured.hook}</p>
            <SmartLink className="read-link" href={`/stories/${featured.slug}`}>
              Enter this exhibit <Arrow />
            </SmartLink>
          </div>
          <SmartLink className="featured__graphic" href={`/stories/${featured.slug}`} aria-label={`Enter ${featured.title}`}>
            <div className="featured__issue">THOUGHT<br />NO. {featured.number}</div>
            <MiniPlot />
            <p>First, the line you expect.<br />Then, the exceptions.</p>
          </SmartLink>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
