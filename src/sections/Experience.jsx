import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'
import { EXPERIENCE } from '../data/profile'

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line py-20 md:py-28">
      <div className="page grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <SectionTitle id="experience-title">Experience</SectionTitle>
        </div>

        <ol className="md:col-span-8">
          {EXPERIENCE.map((job) => (
            <Reveal as="li" key={job.company} className="border-t border-line py-8 first:border-t-0 first:pt-0 md:first:pt-2">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-lg font-medium">
                  {job.role} <span className="text-muted">· {job.company}</span>
                </h3>
                <p className="shrink-0 text-sm tabular-nums text-muted">
                  {job.period}
                  {job.place && ` · ${job.place}`}
                </p>
              </div>
              <ul className="mt-4 flex flex-col gap-2 leading-relaxed text-ink/80">
                {job.points.map((p) => (
                  <li key={p} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-muted">
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">{job.tags.join(' · ')}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
