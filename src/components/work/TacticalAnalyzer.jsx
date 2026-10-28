import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Lightbox from './Lightbox'
import demo from '../../assets/projects/tactique/demo.mp4'
import poster from '../../assets/projects/tactique/demo-poster.webp'
import build from '../../assets/projects/tactique/1-build.png'
import analysis from '../../assets/projects/tactique/2-analysis.png'
import review from '../../assets/projects/tactique/3-review.png'

const GITHUB = 'https://github.com/NoeLanternier'

const SCREENS = [
  { src: build, alt: 'During the game: what to buy next, and why' },
  { src: analysis, alt: 'During the game: what the opponents are good at' },
  { src: review, alt: 'After the game: a review with concrete tips' },
]

// Autoplay only for visitors who don't ask for reduced motion.
const autoPlay =
  typeof window !== 'undefined' && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function TacticalAnalyzer() {
  const [zoom, setZoom] = useState(null)

  return (
    <article aria-labelledby="tactical-title" className="grid gap-10 md:grid-cols-12">
      <header className="md:col-span-5">
        <p className="text-sm text-muted">Side project · 2026</p>
        <h3 id="tactical-title" className="mt-3 font-serif text-4xl leading-none md:text-5xl">
          Tactical Analyzer
        </h3>
        <p className="mt-3 text-xl text-ink/85">A desktop companion for League of Legends players</p>

        <div className="mt-6 flex flex-col gap-4 leading-relaxed text-ink/80">
          <p>
            I designed and built this one on my own. In League of Legends, players buy items during
            the match, and the right choice depends on the opponents.
          </p>
          <p>
            The app sits on top of the game, reads the match as it happens and suggests what to buy
            next, with a short reason for each item. After the game, it reviews how it went and
            gives concrete tips.
          </p>
          <p>
            Its data comes from high-level games through the Riot Games API, refreshed every night
            by a GitHub Actions job, so it costs nothing to run.
          </p>
        </div>

        <p className="mt-6 text-sm text-muted">Electron · React · TypeScript · Tailwind CSS · GitHub Actions</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
          <a
            href={`${GITHUB}/analyseur-tactique`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 link"
          >
            Source code <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={`${GITHUB}/tactique-meta`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 link"
          >
            Data pipeline <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <div className="md:col-span-7">
        <figure>
          <video
            src={demo}
            poster={poster}
            width="1280"
            height="720"
            muted
            loop
            playsInline
            autoPlay={autoPlay}
            controls
            preload="metadata"
            className="aspect-video w-full rounded-md border border-line bg-ink"
            aria-label="Demo: the overlay during a League of Legends game"
          />
          <figcaption className="mt-3 text-sm text-muted">
            Demo: the overlay next to a game in progress.
          </figcaption>
        </figure>

        <ul className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
          {SCREENS.map((s, i) => (
            <li key={s.src}>
              <button
                type="button"
                onClick={() => setZoom(i)}
                className="block w-full cursor-zoom-in overflow-hidden rounded-md border border-line bg-ink"
                aria-label={`Enlarge: ${s.alt}`}
              >
                <img
                  src={s.src}
                  alt=""
                  width="380"
                  height="780"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
                />
              </button>
              <p className="mt-2 text-xs leading-snug text-muted sm:text-sm">{s.alt}</p>
            </li>
          ))}
        </ul>
      </div>

      {zoom !== null && (
        <Lightbox images={SCREENS} index={zoom} onClose={() => setZoom(null)} onChange={setZoom} />
      )}
    </article>
  )
}
