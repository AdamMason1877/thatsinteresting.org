export default function SmartLink({ href, children, className, onClick, ...props }) {
  const handleClick = (event) => {
    onClick?.(event)

    if (event.defaultPrevented) return

    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return

    event.preventDefault()
    const destination = new URL(href, window.location.href)
    window.history.pushState({}, '', `${destination.pathname}${destination.search}${destination.hash}`)
    window.dispatchEvent(new PopStateEvent('popstate'))

    window.setTimeout(() => {
      const target = destination.hash ? document.querySelector(destination.hash) : null
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'auto' })
    }, 0)
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  )
}
