import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Full-size viewer for the screenshots: Esc closes, ← / → browse.
export default function Lightbox({ images, index, onClose, onChange }) {
  const count = images.length
  const image = images[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onChange((index - 1 + count) % count)
      if (e.key === 'ArrowRight') onChange((index + 1) % count)
    }
    window.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [index, count, onClose, onChange])

  const nav =
    'absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition hover:bg-brand-600'

  // Rendered in <body>: the project card uses backdrop-filter, which would otherwise trap a
  // fixed-position element inside it.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
      className="fixed inset-0 z-[100] flex animate-fade-in flex-col items-center justify-center gap-3 bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <img
        src={image.src}
        alt={image.title}
        className="max-h-[85vh] max-w-full rounded-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="font-display text-sm text-slate-200">
        {image.title} <span className="text-slate-500">· {index + 1} / {count}</span>
      </p>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous"
            className={`${nav} left-4`}
            onClick={(e) => {
              e.stopPropagation()
              onChange((index - 1 + count) % count)
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className={`${nav} right-4`}
            onClick={(e) => {
              e.stopPropagation()
              onChange((index + 1) % count)
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>,
    document.body,
  )
}
