import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const AUTOPLAY_MS = 5000

// Carousel of project media. Each slide is { caption, src } (image) or
// { caption, key, render(go), hideCaption } (live component; slides sharing a key are not
// remounted).
// Dots, arrows and the caption sit inside the frame (in the free space next to the overlay),
// so they add no height.
export default function MediaCarousel({ slides, className = '' }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length
  const go = (i) => setIndex(((i % count) + count) % count)
  const slide = slides[index]

  // Plays on its own, pauses while hovered/focused or if the visitor prefers reduced motion.
  useEffect(() => {
    if (paused || count < 2 || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
      return
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, count])

  const arrow =
    'flex h-7 w-7 items-center justify-center rounded-full text-slate-200 transition hover:bg-brand-600 hover:text-white'

  return (
    <div
      className={`relative h-[412px] overflow-hidden rounded-2xl border border-white/10 bg-[#05070b] shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${className}`}
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div key={slide.key ?? `slide-${index}`} className="h-full w-full animate-fade-in">
        {slide.render ? (
          slide.render(go)
        ) : (
          <a href={slide.src} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
            <img src={slide.src} alt={slide.caption} className="h-full w-full object-contain" loading="lazy" />
          </a>
        )}
      </div>

      {count > 1 && (
        <>
          {!slide.hideCaption && (
            <span className="absolute right-3 top-3 hidden max-w-[45%] truncate rounded-full border border-white/10 bg-black/70 px-3 py-1 font-display text-xs text-slate-200 backdrop-blur-md sm:block">
              {slide.caption}
            </span>
          )}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 p-1 backdrop-blur-md">
            <button type="button" aria-label="Previous" onClick={() => go(index - 1)} className={arrow}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5" role="tablist">
              {slides.map((s, i) => (
                <button
                  key={`${s.caption}-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={s.caption}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-5 bg-brand-500' : 'w-2 bg-white/30 hover:bg-white/60'}`}
                />
              ))}
            </div>
            <button type="button" aria-label="Next" onClick={() => go(index + 1)} className={arrow}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
