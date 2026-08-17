import SmartLink from './SmartLink.jsx'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="site-footer__manifesto">Stay curious.<br />Follow the evidence.</p>
        <p className="site-footer__small">Visual stories about the systems hiding in plain sight.</p>
      </div>
      <div className="site-footer__links">
        <SmartLink href="/">Index</SmartLink>
        <a href="mailto:hello@thatsinteresting.org">Contact</a>
        <span>© 2026</span>
      </div>
    </footer>
  )
}
