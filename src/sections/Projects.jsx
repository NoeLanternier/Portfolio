import TactiqueProject from '../components/projects/TactiqueProject'

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-black px-4 pb-6 pt-24 md:px-8"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-purple-500/15 to-brand-900/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* pt-24 on the section keeps the title clear of the fixed navbar. */}
        <header className="text-center">
          <h2 className="bg-gradient-to-tr from-brand-400 to-brand-700 bg-clip-text font-display text-4xl font-bold text-transparent md:text-5xl">
            Projects
          </h2>
          <p className="mt-2 font-display text-lg text-brand-300">
            Things I designed, built and shipped end to end.
          </p>
        </header>

        <TactiqueProject />
      </div>
    </section>
  )
}
