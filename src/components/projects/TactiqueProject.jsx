import { useState } from 'react'
import { ArrowUpRight, ClipboardCheck, Download, Gauge, Swords, Zap } from 'lucide-react'
import { IconBrandGithub } from '@tabler/icons-react'
import MediaCarousel from './MediaCarousel'
import ScreenshotSlide from './ScreenshotSlide'
import Lightbox from './Lightbox'

const SCREEN_INFO = {
  build: {
    eyebrow: 'In game',
    title: 'Adaptive build, live',
    points: [
      'Next buy, with the gold still missing and the component to grab first.',
      'Every item explains why: “wins vs AD +21.3%”, “auto attacks”, “jungle pet”…',
      'Runes picked for the enemy team and sent to the client in champ select.',
    ],
  },
  analysis: {
    eyebrow: 'In game',
    title: 'Enemy threat analysis',
    points: [
      'Damage split and threat profile, weighted by each enemy’s gold and score.',
      'Spots the fed enemy and moves defensive items up the build.',
      'A plain-language tactical read of the game state.',
    ],
  },
  review: {
    eyebrow: 'After the game',
    title: 'Post-game review',
    points: [
      'Grades farm, build, fights, objectives and vision against Master+ benchmarks.',
      'Strengths and things to work on, each with a concrete tip.',
      'Checks your build against the advice the app gave at each moment.',
    ],
  },
}

// Screenshots: drop images into src/assets/projects/tactique/ (e.g. "1-build.png").
// They are sorted by file name. The name without its number ("build", "analysis", "review")
// picks the description below; any other name is shown with its name as the title.
const SCREENSHOTS = Object.entries(
  import.meta.glob('../../assets/projects/tactique/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', {
    eager: true,
    import: 'default',
  }),
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => {
    const slug = path
      .split('/')
      .pop()
      .replace(/\.[^.]+$/, '')
      .replace(/^\d+[-_ ]*/, '')
      .replace(/[-_]+/g, ' ')
      .trim()
    const info = SCREEN_INFO[slug.toLowerCase()]
    return {
      src,
      title: info?.title ?? slug.charAt(0).toUpperCase() + slug.slice(1),
      eyebrow: info?.eyebrow ?? 'Screenshot',
      points: info?.points ?? [],
    }
  })

const GITHUB = 'https://github.com/NoeLanternier'

const FEATURES = [
  {
    icon: Swords,
    title: 'Champion select',
    text: 'Pick & ban advice from your champion pool and matchups. Runes sent to the client.',
  },
  {
    icon: Gauge,
    title: 'Live adaptive build',
    text: 'Scores every item vs enemy damage, healing and who is fed, live. Next buy + shop.',
  },
  {
    icon: Zap,
    title: 'Daily meta pipeline',
    text: 'Nightly GitHub Actions job on Master+ games: builds and win rates by context.',
  },
  {
    icon: ClipboardCheck,
    title: 'Post-game review',
    text: 'Grades farm, build, fights, objectives and vision, then adapts the advice to you.',
  },
]

const FLOW = [
  'Riot API',
  'GitHub Actions',
  'meta.json',
  'Electron overlay',
  'Live game',
  'Post-game review',
  'Personal learning',
]

const STACK = [
  'Electron',
  'React 19',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'GitHub Actions',
  'Riot Games API',
]

const FACTS = [
  { value: '60', label: 'junglers tuned' },
  { value: '4', label: 'regions nightly' },
  { value: '2 s', label: 'live refresh' },
  { value: '0 €', label: 'hosting' },
]

function LinkButton({ href, icon: Icon, children, primary = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        primary
          ? 'flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 font-display text-sm font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.45)] transition-all hover:scale-105 hover:bg-brand-500 active:scale-95'
          : 'flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 font-display text-sm font-medium text-brand-300 backdrop-blur-md transition-all hover:scale-105 hover:border-brand-500/40 hover:bg-white/[0.08] hover:text-white'
      }
    >
      <Icon className="h-4 w-4" />
      {children}
    </a>
  )
}

export default function TactiqueProject() {
  const [zoom, setZoom] = useState(null)

  const slides = SCREENSHOTS.map((shot, i) => ({
    caption: shot.title,
    hideCaption: true,
    render: () => <ScreenshotSlide {...shot} onOpen={() => setZoom(i)} />,
  }))

  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md md:p-7">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-tr from-brand-600/25 to-purple-300/10 blur-3xl" />

      <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2 font-display text-xs font-medium text-brand-300">
            <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1">
              Featured project
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">Windows desktop app</span>
            <span className="rounded-full border border-white/10 px-3 py-1">2026</span>
          </div>

          <div>
            <h3 className="font-display text-3xl font-bold text-white md:text-4xl">
              Tactical Analyzer
            </h3>
            <p className="mt-1.5 font-display text-lg text-brand-300">
              League of Legends jungle overlay: runes, adaptive builds and post-game coaching
            </p>
          </div>

          <p className="leading-relaxed text-slate-300">
            An always-on-top overlay that connects to the League client and the live game to give
            junglers the best runes and item build for their exact match, then reviews each game
            and adapts its advice to the way they play.
          </p>

          <dl className="grid grid-cols-4 gap-2">
            {FACTS.map((f) => (
              <div key={f.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-xl font-bold text-white">{f.value}</dd>
                <dd className="text-[11px] leading-tight text-slate-400">{f.label}</dd>
              </div>
            ))}
          </dl>

          {/* Stack: a single line from 1280 px wide, chips stretch to fill it. */}
          <ul className="flex flex-wrap gap-1.5 xl:flex-nowrap xl:gap-1">
            {STACK.map((s) => (
              <li
                key={s}
                className="whitespace-nowrap rounded-md bg-brand-500/10 px-2 py-1 text-center font-sans text-[11px] font-medium text-brand-200 xl:grow xl:px-1.5"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <LinkButton href={`${GITHUB}/analyseur-tactique/releases/latest`} icon={Download} primary>
              Download
            </LinkButton>
            <LinkButton href={`${GITHUB}/analyseur-tactique`} icon={IconBrandGithub}>
              Source code
            </LinkButton>
            <LinkButton href={`${GITHUB}/tactique-meta`} icon={ArrowUpRight}>
              Meta pipeline
            </LinkButton>
          </div>
        </div>

        {slides.length > 0 && <MediaCarousel slides={slides} className="min-w-0" />}
      </div>

      <ul className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <li key={title} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 shrink-0 text-brand-400" />
              <h4 className="font-display text-sm font-semibold text-white">{title}</h4>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{text}</p>
          </li>
        ))}
      </ul>

      {/* Data flow: a single line filling the whole width (scrolls horizontally on small screens). */}
      <div className="relative mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:gap-3">
        <h4 className="shrink-0 font-display text-xs font-semibold uppercase tracking-widest text-brand-400">
          How it works
        </h4>
        <ol className="flex min-w-0 flex-1 flex-nowrap items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs [scrollbar-width:none] max-xl:[mask-image:linear-gradient(to_right,black_85%,transparent)]">
          {FLOW.map((step, i) => (
            <li key={step} className="flex shrink-0 items-center gap-1.5 lg:grow">
              <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-center text-slate-200 lg:grow">
                {step}
              </span>
              <span aria-hidden className="text-brand-500">
                {i < FLOW.length - 1 ? '→' : '↺'}
              </span>
            </li>
          ))}
        </ol>
      </div>
      {zoom !== null && SCREENSHOTS.length > 0 && (
        <Lightbox images={SCREENSHOTS} index={zoom} onClose={() => setZoom(null)} onChange={setZoom} />
      )}
    </article>
  )
}
