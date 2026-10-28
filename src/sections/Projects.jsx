import TactiqueProject from '../components/projects/TactiqueProject'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-black px-4 pb-6 pt-24 md:px-8"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-purple-500/15 to-brand-900/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* pt-24 on the section keeps the title clear of the fixed navbar. */}
        <SectionHeader title="Projects" subtitle="Things I designed, built and shipped end to end." />

        <Reveal>
          <TactiqueProject />
        </Reveal>
      </div>
    </section>
  )
}
