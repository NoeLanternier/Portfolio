// Section title shared by every section (gradient title + short subtitle).
export default function SectionHeader({ title, subtitle }) {
  return (
    <header className="text-center">
      <h2 className="bg-gradient-to-tr from-brand-400 to-brand-700 bg-clip-text font-display text-4xl font-bold text-transparent md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-2 font-display text-lg text-brand-300">{subtitle}</p>}
    </header>
  )
}
