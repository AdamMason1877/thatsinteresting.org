import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import StoryPage from './pages/StoryPage.jsx'
import { articles } from './content/articles.js'

function getRoute() {
  const match = window.location.pathname.match(/^\/stories\/([^/]+)\/?$/)
  return match ? { page: 'story', slug: match[1] } : { page: 'home' }
}

export default function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onPopState = () => setRoute(getRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  if (route.page === 'story') {
    const article = articles.find((item) => item.slug === route.slug)
    return <StoryPage article={article} />
  }

  return <HomePage />
}
