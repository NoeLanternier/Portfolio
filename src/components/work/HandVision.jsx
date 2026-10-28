import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Figure from './Figure'
import Lightbox from './Lightbox'
import landing from '../../assets/projects/handvision/landing.webp'
import stats from '../../assets/projects/handvision/stats.webp'
import video from '../../assets/projects/handvision/video.webp'

const IMAGES = [
  {
    src: landing,
    width: 1286,
    height: 834,
    alt: 'HandVision landing page',
    caption: 'Landing page (the app is in French).',
  },
  {
    src: stats,
    width: 1164,
    height: 725,
    alt: 'HandVision stats page: team totals, list of actions and match timeline',
    caption: 'The stats page I designed: team totals, every action of the match and the timeline. Names are fictional.',
  },
  {
    src: video,
    width: 1170,
    height: 730,
    alt: 'HandVision video page: match footage with its sequences underneath',
    caption: 'Video page: each action becomes a sequence under the footage. Footage blurred for privacy.',
  },
]

const FACTS = [
  { label: 'Role', value: 'UI/UX design and frontend development' },
  { label: 'Team', value: '6 people, remote: Sweden, Ireland, Germany, South Korea' },
  { label: 'Tools', value: 'Figma, Svelte, TypeScript, Tailwind CSS' },
  { label: 'Since', value: '2025' },
]

const NOTES = [
  {
    title: 'What a coach looks at first',
    text: 'A single match produces a lot of numbers. The hard part was choosing what a coach wants to see first and showing it without making the page unreadable. Our project lead, a former semi-pro player, told us what actually speaks to coaches, and beta testers helped us adjust.',
  },
  {
    title: 'Made for phones too',
    text: 'On mobile, secondary buttons become icons only and the match timeline is hidden by default. One button opens it full screen in landscape, where it has enough room to be read.',
  },
  {
    title: 'The match timeline',
    text: 'The chart plots every action over time, so a coach can spot when a player was at their best: three goals or saves in a few minutes stand out at a glance.',
  },
]

export default function HandVision() {
  const [zoom, setZoom] = useState(null)

  return (
    <article aria-labelledby="handvision-title">
      <div className="grid gap-10 md:grid-cols-12">
        <header className="md:col-span-5">
          <h3 id="handvision-title" className="font-serif text-5xl leading-none md:text-6xl">
            HandVision
          </h3>
          <p className="mt-3 text-xl text-ink/85">Match analysis for amateur handball clubs</p>
          <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-line pt-6 text-sm">
            {FACTS.map(({ label, value }) => (
              <div key={label} className="contents">
                <dt className="text-muted">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <a
            href="https://hand-vision.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-8"
          >
            Visit hand-vision.fr <ArrowUpRight className="h-4 w-4" />
          </a>
        </header>

        <div className="flex flex-col gap-5 text-lg leading-relaxed md:col-span-7 md:pt-2">
          <p>
            Video analysis tools for handball are made for professional clubs, and priced for them.
            HandVision brings the same workflow to amateur and semi-pro teams.
          </p>
          <p className="text-ink/80">
            A coach imports the match video and the match sheet. The app cuts the video into
            sequences that the staff can annotate and assign to players, and turns the match sheet
            into stats tables and charts. Coaches set up their club, teams and matches, then invite
            other coaches and their players.
          </p>
          <p className="text-ink/80">
            I designed the stats page in Figma and developed the app’s pages with the rest of the
            team, for large screens and for phones.
          </p>
        </div>
      </div>

      <Figure
        {...IMAGES[0]}
        className="mt-14"
        onOpen={() => setZoom(0)}
      />

      <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {NOTES.map(({ title, text }, i) => (
          <li key={title} className="border-t border-ink pt-5">
            <p className="font-serif text-2xl text-muted">{String(i + 1).padStart(2, '0')}</p>
            <h4 className="mt-2 font-medium">{title}</h4>
            <p className="mt-2 leading-relaxed text-muted">{text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <Figure {...IMAGES[1]} onOpen={() => setZoom(1)} />
        <Figure {...IMAGES[2]} onOpen={() => setZoom(2)} />
      </div>

      <p className="mt-12 max-w-2xl font-serif text-3xl leading-tight">
        Feedback from the beta testers has been very positive.
      </p>

      {zoom !== null && (
        <Lightbox images={IMAGES} index={zoom} onClose={() => setZoom(null)} onChange={setZoom} />
      )}
    </article>
  )
}
