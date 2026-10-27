import { Expand } from 'lucide-react'
import GameBackdrop from './GameBackdrop'

// A real screenshot of the overlay, docked on the left like in game, with a short explanation
// on the right. Clicking the screenshot opens it full size.
export default function ScreenshotSlide({ src, title, eyebrow, points = [], onOpen }) {
  return (
    <div className="relative h-full overflow-hidden bg-[#05070b]">
      <GameBackdrop />
      <div className="relative flex h-full items-stretch justify-center gap-6 p-3 pb-14 sm:justify-start sm:pb-3">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Enlarge: ${title}`}
          className="group relative h-full shrink-0 overflow-hidden rounded-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:scale-[1.02]"
        >
          <img src={src} alt={title} className="h-full w-auto" loading="lazy" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1.5 font-display text-xs font-semibold text-white shadow-lg">
              <Expand className="h-3.5 w-3.5" /> Enlarge
            </span>
          </span>
        </button>

        <div className="hidden min-w-0 flex-1 flex-col justify-center gap-3 pb-10 pr-3 sm:flex">
          {eyebrow && (
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-[#0ac8b9]">
              {eyebrow}
            </span>
          )}
          <h4 className="font-display text-xl font-bold leading-tight text-white">{title}</h4>
          {points.length > 0 && (
            <ul className="flex flex-col gap-2 text-sm leading-snug text-slate-300">
              {points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4b872]" />
                  {p}
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={onOpen}
            className="mt-1 flex w-fit items-center gap-1.5 text-xs text-brand-300 transition-colors hover:text-white"
          >
            <Expand className="h-3.5 w-3.5" /> View full size
          </button>
        </div>
      </div>
    </div>
  )
}
