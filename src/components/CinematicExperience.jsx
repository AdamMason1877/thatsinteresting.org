import { useEffect, useMemo, useRef, useState } from 'react'
import { majorData } from '../content/articles.js'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const lerp = (start, end, amount) => start + (end - start) * amount
const smoothstep = (start, end, value) => {
  const amount = clamp((value - start) / (end - start))
  return amount * amount * (3 - 2 * amount)
}

function useCinematicProgress(ref, sceneCount) {
  const [progress, setProgress] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => {
      const node = ref.current
      if (!node) return

      if (motionQuery.matches) {
        setProgress(1)
        return
      }

      const bounds = node.getBoundingClientRect()
      const travel = Math.max(1, bounds.height - window.innerHeight)
      setProgress(clamp(-bounds.top / travel))
    }

    const updateMotionPreference = () => {
      setReduceMotion(motionQuery.matches)
      update()
    }

    updateMotionPreference()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    motionQuery.addEventListener('change', updateMotionPreference)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      motionQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [ref, sceneCount])

  return { progress, reduceMotion }
}

function useNarrowViewport() {
  const [isNarrow, setIsNarrow] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 760px)')
    const update = () => setIsNarrow(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isNarrow
}

function SceneCopy({ scenes, activeScene }) {
  return (
    <div className="cinematic-copy" aria-live="off">
      {scenes.map((scene, index) => (
        <div
          className={`cinematic-copy__scene ${index === activeScene ? 'is-active' : ''}`}
          key={scene.marker}
          aria-hidden={index !== activeScene}
        >
          <p>{scene.marker}</p>
          <h2>{scene.title}</h2>
          <span>{scene.copy}</span>
        </div>
      ))}
    </div>
  )
}

function SceneRail({ scenes, activeScene, progress }) {
  return (
    <div className="cinematic-rail" aria-hidden="true">
      <i style={{ transform: `scaleY(${progress})` }} />
      {scenes.map((scene, index) => (
        <span className={index <= activeScene ? 'is-active' : ''} key={scene.marker} />
      ))}
    </div>
  )
}

const focusNames = new Set([
  'Chemical Engineering',
  'Aerospace Engineering',
  'Architecture',
  'Marketing',
  'Political Science',
])

function RigorRewardVisual({ progress, alt, className = '' }) {
  const isNarrow = useNarrowViewport()
  const morph = smoothstep(0.18, 0.48, progress)
  const reveal = smoothstep(0.48, 0.72, progress)
  const settle = smoothstep(0.72, 0.98, progress)

  const frame = isNarrow
    ? { width: 720, height: 960, left: 92, right: 628, top: 126, bottom: 820 }
    : { width: 1080, height: 720, left: 126, right: 966, top: 134, bottom: 604 }

  const { points, idealPath, trendPath } = useMemo(() => {
    const horizontalSpan = frame.right - frame.left
    const verticalSpan = frame.bottom - frame.top
    const toX = (rigor) => frame.left + ((rigor - 2.2) / 6.8) * horizontalSpan
    const toY = (pay) => frame.bottom - ((pay - 50) / 90) * verticalSpan
    const count = majorData.length
    const sumX = majorData.reduce((sum, major) => sum + major.rigor, 0)
    const sumY = majorData.reduce((sum, major) => sum + major.mid, 0)
    const sumXX = majorData.reduce((sum, major) => sum + major.rigor ** 2, 0)
    const sumXY = majorData.reduce((sum, major) => sum + major.rigor * major.mid, 0)
    const slope = ((count * sumXY) - (sumX * sumY)) / ((count * sumXX) - (sumX ** 2))
    const intercept = (sumY - slope * sumX) / count
    const trendStart = { x: toX(2.2), y: toY(intercept + slope * 2.2) }
    const trendEnd = { x: toX(9), y: toY(intercept + slope * 9) }

    return {
      points: majorData.map((major) => {
        const idealPay = 54 + ((major.rigor - 2.2) / 6.8) * 82
        return {
          ...major,
          x: toX(major.rigor),
          idealY: toY(idealPay),
          actualY: toY(major.mid),
        }
      }),
      idealPath: `M ${toX(2.2)} ${toY(54)} L ${toX(9)} ${toY(136)}`,
      trendPath: `M ${trendStart.x} ${trendStart.y} L ${trendEnd.x} ${trendEnd.y}`,
    }
  }, [frame.bottom, frame.left, frame.right, frame.top])

  const horizontalSpan = frame.right - frame.left
  const verticalSpan = frame.bottom - frame.top
  const labelLift = isNarrow ? { lineStart: 20, lineEnd: 58, name: 70, value: 44 } : { lineStart: 14, lineEnd: 39, name: 48, value: 31 }

  return (
    <div className={`rigor-cinema ${className}`.trim()} role="img" aria-label={alt} data-layout={isNarrow ? 'mobile' : 'desktop'}>
      <div className="rigor-cinema__glow" style={{ opacity: 0.15 + reveal * 0.35 }} />
      <svg viewBox={`0 0 ${frame.width} ${frame.height}`} aria-hidden="true">
        <defs>
          <linearGradient id="cinema-line" x1="0" x2="1">
            <stop offset="0" stopColor="#70e1ff" />
            <stop offset="1" stopColor="#d9ff5b" />
          </linearGradient>
          <filter id="cinema-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g className="rigor-cinema__grid" style={{ opacity: morph * 0.48 }}>
          {[0, 1, 2, 3].map((index) => (
            <line
              key={`h-${index}`}
              x1={frame.left}
              x2={frame.right}
              y1={frame.top + (index * verticalSpan) / 3}
              y2={frame.top + (index * verticalSpan) / 3}
            />
          ))}
          {[0, 1, 2, 3, 4].map((index) => (
            <line
              key={`v-${index}`}
              x1={frame.left + (index * horizontalSpan) / 4}
              x2={frame.left + (index * horizontalSpan) / 4}
              y1={frame.top}
              y2={frame.bottom}
            />
          ))}
        </g>

        <path
          className="rigor-cinema__ideal"
          d={idealPath}
          pathLength="1"
          style={{ opacity: 1 - reveal * 0.78, strokeDashoffset: morph * 0.18 }}
        />

        <path
          className="rigor-cinema__trend"
          d={trendPath}
          style={{ opacity: reveal * 0.84 }}
        />

        <text className="rigor-cinema__premise" x={frame.left + 54} y={frame.bottom - 42} style={{ opacity: 1 - morph * 1.7 }}>
          MORE RIGOR
        </text>
        <text className="rigor-cinema__premise" x={frame.right - (isNarrow ? 210 : 224)} y={frame.top + 50} style={{ opacity: 1 - morph * 1.7 }}>
          MORE REWARD
        </text>

        <g className="rigor-cinema__points">
          {points.map((point, index) => {
            const y = lerp(point.idealY, point.actualY, morph)
            const focused = focusNames.has(point.name)
            const baseOpacity = focused ? 0.94 : lerp(0.82, 0.4, reveal)
            const radius = focused ? lerp(7, 10, reveal) : 5.5

            return (
              <g key={point.name}>
                <circle
                  cx={point.x}
                  cy={y}
                  r={radius}
                  data-group={point.group}
                  style={{
                    opacity: baseOpacity,
                    transform: `translate(${Math.sin(index * 2.4) * settle * 2}px, ${Math.cos(index) * settle * 2}px)`,
                  }}
                />
                {focused && (
                  <g className="rigor-cinema__label" style={{ opacity: reveal }}>
                    <line x1={point.x} x2={point.x} y1={y - labelLift.lineStart} y2={y - labelLift.lineEnd} />
                    <text x={point.x} y={y - labelLift.name}>{point.short}</text>
                    <text x={point.x} y={y - labelLift.value}>${point.mid}K</text>
                  </g>
                )}
              </g>
            )
          })}
        </g>

        <g className="rigor-cinema__axis" style={{ opacity: morph }}>
          <text x={frame.left} y={frame.height - 48}>LOWER CONCEPTUAL LOAD</text>
          <text x={frame.right} y={frame.height - 48} textAnchor="end">HIGHER CONCEPTUAL LOAD</text>
          <text
            x={isNarrow ? 32 : 54}
            y={frame.top + verticalSpan / 2}
            transform={`rotate(-90 ${isNarrow ? 32 : 54} ${frame.top + verticalSpan / 2})`}
            textAnchor="middle"
          >
            MID-CAREER PAY
          </text>
        </g>

        <g className="rigor-cinema__line-key" style={{ opacity: reveal }}>
          <text x={frame.left + horizontalSpan * 0.55} y={frame.top + verticalSpan * 0.39}>OBSERVED TREND</text>
          <text x={frame.left + horizontalSpan * 0.58} y={frame.top + 26}>EXPECTED BARGAIN</text>
        </g>

        <g className="rigor-cinema__question" style={{ opacity: settle }}>
          <text x={frame.width / 2} y={frame.height / 2 - 18} textAnchor="middle">WHAT DOES</text>
          <text x={frame.width / 2} y={frame.height / 2 + 37} textAnchor="middle">DIFFICULTY BUY?</text>
        </g>
      </svg>
      <div className="rigor-cinema__counter" aria-hidden="true">
        <span>25 majors</span>
        <span>r = 0.64</span>
        <span>one broken assumption</span>
      </div>
    </div>
  )
}

function FrameSequenceVisual({ frames, progress, alt }) {
  const frameIndex = Math.min(frames.length - 1, Math.floor(progress * frames.length))
  return <img className="cinematic-frame" src={frames[frameIndex]} alt={alt} />
}

function ScrubbedVideo({ article, progress, reduceMotion, className = '' }) {
  const assets = article.cinematic_assets
  const videoRef = useRef(null)
  const [metadataSource, setMetadataSource] = useState(null)
  const [readySource, setReadySource] = useState(null)
  const isNarrow = useNarrowViewport()
  const selectedVideo = isNarrow && article.mobile_video
    ? article.mobile_video
    : assets.desktop_video
  const metadataReady = metadataSource === selectedVideo
  const videoReady = readySource === selectedVideo

  useEffect(() => {
    const video = videoRef.current
    if (!video || !metadataReady || reduceMotion || !Number.isFinite(video.duration)) return

    const lastFrame = Math.max(0, video.duration - 0.04)
    const targetTime = clamp(progress) * lastFrame
    if (Math.abs(video.currentTime - targetTime) > 0.03) video.currentTime = targetTime
    video.pause()
  }, [metadataReady, progress, reduceMotion, selectedVideo])

  if (reduceMotion) {
    return (
      <div className={`cinematic-video-shell ${className}`.trim()}>
        <img
          className="cinematic-video cinematic-video--poster"
          src={article.poster_frame}
          alt=""
          aria-hidden="true"
        />
      </div>
    )
  }

  return (
    <div className={`cinematic-video-shell ${className}`.trim()}>
      <img
        className={`cinematic-video-poster ${videoReady ? 'is-hidden' : ''}`}
        src={article.poster_frame}
        alt=""
        aria-hidden="true"
      />
      <video
        key={selectedVideo}
        ref={videoRef}
        className={`cinematic-video ${videoReady ? 'is-ready' : ''}`}
        src={selectedVideo}
        muted
        playsInline
        preload="metadata"
        poster={article.poster_frame ?? undefined}
        aria-hidden="true"
        tabIndex={-1}
        data-cinematic-source={isNarrow ? 'mobile' : 'desktop'}
        onLoadedMetadata={(event) => {
          event.currentTarget.pause()
          setMetadataSource(selectedVideo)
        }}
        onCanPlay={() => setReadySource(selectedVideo)}
      >
      </video>
    </div>
  )
}

function HybridVisual({ article, progress, reduceMotion }) {
  const videoOpacity = reduceMotion ? 0.26 : 1 - smoothstep(0.62, 0.84, progress)
  const dataOpacity = reduceMotion ? 1 : smoothstep(0.58, 0.84, progress)
  const dataProgress = reduceMotion ? 1 : smoothstep(0.3, 0.82, progress)

  return (
    <div
      className="cinematic-hybrid"
      data-reduced-motion={reduceMotion ? 'true' : 'false'}
      style={{ '--video-opacity': videoOpacity, '--data-opacity': dataOpacity }}
    >
      <ScrubbedVideo
        article={article}
        progress={progress}
        reduceMotion={reduceMotion}
        className="cinematic-hybrid__video"
      />
      <RigorRewardVisual
        progress={dataProgress}
        alt={article.visual_alt_text}
        className="cinematic-hybrid__data"
      />
    </div>
  )
}

function ConceptVisual({ article, activeScene }) {
  const scene = article.cinematic_concept.scenes[activeScene]
  return (
    <div className="concept-cinema" role="img" aria-label={article.visual_alt_text}>
      <i className="concept-cinema__ring concept-cinema__ring--one" />
      <i className="concept-cinema__ring concept-cinema__ring--two" />
      <span>{String(activeScene + 1).padStart(2, '0')}</span>
      <strong>{scene.title}</strong>
    </div>
  )
}

function VisualRenderer({ article, progress, activeScene, reduceMotion }) {
  const assets = article.cinematic_assets

  if (assets.renderer === 'rigor-reward-hybrid') {
    return <HybridVisual article={article} progress={progress} reduceMotion={reduceMotion} />
  }

  if (assets.renderer === 'rigor-reward-morph') {
    return <RigorRewardVisual progress={progress} alt={article.visual_alt_text} />
  }

  if (article.desktop_frame_sequence.length > 0) {
    return (
      <FrameSequenceVisual
        frames={article.desktop_frame_sequence}
        progress={progress}
        alt={article.visual_alt_text}
      />
    )
  }

  if (assets.desktop_video) {
    return <ScrubbedVideo article={article} progress={progress} reduceMotion={reduceMotion} />
  }

  return <ConceptVisual article={article} activeScene={activeScene} />
}

export default function CinematicExperience({ article }) {
  const containerRef = useRef(null)
  const scenes = article.cinematic_concept.scenes
  const { progress, reduceMotion } = useCinematicProgress(containerRef, scenes.length)
  const activeScene = Math.min(scenes.length - 1, Math.floor(progress * scenes.length))

  return (
    <section
      className="cinematic-experience"
      ref={containerRef}
      style={{ '--cinematic-scenes': scenes.length }}
      aria-label={`Cinematic introduction: ${article.title}`}
    >
      <div className="cinematic-sticky">
        <div className="cinematic-topline">
          <span>Exhibit prelude</span>
          <span>{article.year_or_era}</span>
        </div>
        <div className="cinematic-stage">
          <SceneRail scenes={scenes} activeScene={activeScene} progress={progress} />
          <SceneCopy scenes={scenes} activeScene={activeScene} />
          <VisualRenderer
            article={article}
            progress={progress}
            activeScene={activeScene}
            reduceMotion={reduceMotion}
          />
        </div>
        <div className="cinematic-progress" aria-hidden="true">
          <i style={{ transform: `scaleX(${progress})` }} />
        </div>
        <p className="cinematic-scroll-cue" aria-hidden="true">
          {reduceMotion ? 'The complete constellation' : 'Scroll to reveal the relationship'}
        </p>
      </div>
    </section>
  )
}
