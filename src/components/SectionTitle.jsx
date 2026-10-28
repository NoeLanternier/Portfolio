// Section heading: a large serif title with an optional short line under it.
export default function SectionTitle({ id, children, note }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 id={id} className="font-serif text-5xl leading-none tracking-tight md:text-6xl">
        {children}
      </h2>
      {note && <p className="max-w-sm text-muted">{note}</p>}
    </div>
  )
}
