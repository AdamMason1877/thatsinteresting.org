import { useEffect, useState } from 'react'
import SmartLink from './SmartLink.jsx'

export default function SiteHeader({ minimal = false }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header ${minimal ? 'site-header--minimal' : ''}`}>
      <SmartLink href="/" className="wordmark" aria-label="That's Interesting home">
        <span className="wordmark__mark">TI</span>
        <span className="wordmark__text">That’s Interesting</span>
      </SmartLink>
      <nav className="site-nav" aria-label="Primary navigation">
        <SmartLink href="/#latest">Latest</SmartLink>
        <SmartLink href="/#atlases">Atlases</SmartLink>
        <SmartLink href="/#about">About</SmartLink>
      </nav>
      <button
        className={`round-button ${menuOpen ? 'is-open' : ''}`}
        type="button"
        aria-label={menuOpen ? 'Close site menu' : 'Open site menu'}
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
      <nav id="site-menu" className={`site-menu ${menuOpen ? 'is-open' : ''}`} aria-label="Site menu" aria-hidden={!menuOpen}>
        <div className="site-menu__inner">
          <p>Explore the publication</p>
          <SmartLink href="/#latest" onClick={closeMenu}><span>01</span>Latest story</SmartLink>
          <SmartLink href="/#atlases" onClick={closeMenu}><span>02</span>Atlas index</SmartLink>
          <SmartLink href="/#about" onClick={closeMenu}><span>03</span>About the desk</SmartLink>
        </div>
      </nav>
    </header>
  )
}
