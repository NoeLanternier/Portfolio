import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Full-size viewer for screenshots: Esc closes, ← / → browse.
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
    'absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20'

  const step = (d) => (e) => {
    e.stopPropagation()
    onChange((index + d + count) % count)
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[100] flex animate-fade-in flex-col items-center justify-center gap-4 bg-[#111014]/95 p-4 sm:p-10"
      onClick={onClose}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="max-h-[82vh] max-w-full rounded-md"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="max-w-2xl text-center text-sm text-white/70">
        {image.alt}
        {count > 1 && (
          <span className="text-white/40">
            {' '}
            · {index + 1} / {count}
          </span>
        )}
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
          <button type="button" aria-label="Previous image" className={`${nav} left-3`} onClick={step(-1)}>
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button type="button" aria-label="Next image" className={`${nav} right-3`} onClick={step(1)}>
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>,
    document.body,
  )
}
