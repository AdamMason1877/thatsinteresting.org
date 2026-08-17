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

        <section className="home-editorial" id="about" aria-labelledby="home-editorial-title">
          <header className="home-section-label">
            <span>About the publication</span>
            <span>01</span>
          </header>
          <div className="home-editorial__body">
            <h2 id="home-editorial-title">We follow the connection that makes a familiar subject look different.</h2>
            <div className="home-editorial__notes">
              <p>
                Most ideas are presented alone. We place them beside evidence from another field, another scale, or another point in time.
              </p>
              <p>
                Each exhibit combines reporting, data, and film. The goal is not more information. It is a clearer way to see what was already there.
              </p>
            </div>
          </div>
        </section>

        <section className="home-current" id="latest" aria-labelledby="home-current-title">
          <header className="home-section-label">
            <span id="home-current-title">Current exhibit</span>
            <span>One story, considered closely</span>
          </header>

          <article className="home-exhibit" id="atlases" style={{ '--accent': featured.accent }}>
            <SmartLink className="home-exhibit__visual" href={`/stories/${featured.slug}`} aria-label={`Enter ${featured.title}`}>
              <span className="home-exhibit__number">{featured.number}</span>
              <MiniPlot />
              <span className="home-exhibit__caption">Rigor × mid-career pay</span>
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
      </main>

      <SiteFooter />
    </div>
  )
}
