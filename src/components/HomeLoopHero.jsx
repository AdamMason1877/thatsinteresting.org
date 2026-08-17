import { useEffect, useMemo, useRef, useState } from 'react'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}

export default function HomeLoopHero({ experience }) {
  const videoRef = useRef(null)
  const isNarrow = useMediaQuery('(max-width: 760px)')
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [readySource, setReadySource] = useState(null)
  const selectedVideo = isNarrow ? experience.mobile_video : experience.cinematic_assets.desktop_video
  const selectedPoster = isNarrow && experience.mobile_poster_frame
    ? experience.mobile_poster_frame
    : experience.poster_frame
  const sourceReady = readySource === selectedVideo

  const mediaDescription = useMemo(() => experience.visual_alt_text, [experience.visual_alt_text])

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduceMotion) return

    const startPlayback = () => {
      if (document.visibilityState === 'visible') video.play().catch(() => {})
    }
    startPlayback()
    document.addEventListener('visibilitychange', startPlayback)
    return () => document.removeEventListener('visibilitychange', startPlayback)
  }, [reduceMotion, selectedVideo])

  return (
    <section className="home-loop-hero" aria-labelledby="home-loop-title">
      <div className="home-loop-hero__media" role="img" aria-label={mediaDescription}>
        <img
          className={`home-loop-hero__poster ${sourceReady ? 'is-hidden' : ''}`}
          src={selectedPoster}
          alt=""
          aria-hidden="true"
        />
        {!reduceMotion && (
          <video
            key={selectedVideo}
            ref={videoRef}
            className={`home-loop-hero__video ${sourceReady ? 'is-ready' : ''}`}
            src={selectedVideo}
            poster={selectedPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            data-home-cinematic-source={isNarrow ? 'mobile' : 'desktop'}
            onCanPlay={(event) => {
              setReadySource(selectedVideo)
              event.currentTarget.play().catch(() => {})
            }}
          />
        )}
        <div className="home-loop-hero__veil" aria-hidden="true" />
      </div>

      <div className="home-loop-hero__stamp" aria-hidden="true">
        <span>That’s Interesting</span>
        <span>Film 00:20</span>
      </div>

      <div className="home-loop-hero__copy">
        <h1 id="home-loop-title">
          Nothing is interesting <span>alone.</span>
        </h1>
        <div className="home-loop-hero__dek">
          <p>A visual publication about the hidden relationships that change how the world looks.</p>
          <a href="#about">Read the premise <i aria-hidden="true">↓</i></a>
        </div>
      </div>
    </section>
  )
}
