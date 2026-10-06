import DotGrid from '../components/DotGrid/DotGrid'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <DotGrid />

      <div className="relative z-10">
        <h1 className="font-display text-5xl font-semibold text-brand-600">
          Noé Lanternier
        </h1>
      </div>
    </section>
  )
}
