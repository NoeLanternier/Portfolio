// Screenshot with a caption. Clicking it opens the full-size image (onOpen).
export default function Figure({ src, alt, caption, onOpen, className = '', width, height }) {
  return (
    <figure className={className}>
      <button
        type="button"
        onClick={onOpen}
        className="block w-full cursor-zoom-in overflow-hidden rounded-md border border-line bg-ink"
        aria-label={`Enlarge: ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          className="h-auto w-full transition-transform duration-500 hover:scale-[1.015]"
        />
      </button>
      {caption && <figcaption className="mt-3 text-sm leading-relaxed text-muted">{caption}</figcaption>}
    </figure>
  )
}
