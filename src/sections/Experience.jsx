import { Briefcase, MapPin } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { EXPERIENCE } from '../data/profile'

export default function Experience() {
  return (
    <section id="experience" className="relative w-full overflow-hidden bg-black px-4 pb-16 pt-24 md:px-8">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-brand-700/15 to-purple-400/5 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10">
        <SectionHeader title="Experience" subtitle="Where I’ve been building interfaces." />

        <ol className="relative flex flex-col gap-6 border-l border-white/10 pl-6 md:pl-10">
          {EXPERIENCE.map((job, i) => (
            <Reveal as="li" key={job.company} delay={i * 80} className="relative">
              {/* Timeline dot */}
              <span className="absolute -left-[31px] top-6 flex h-3 w-3 items-center justify-center rounded-full bg-brand-500 shadow-[0_0_12px_rgba(168,85,247,0.8)] md:-left-[47px]" />

              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md transition-colors hover:border-brand-500/30 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{job.role}</h3>
                    <p className="mt-0.5 flex items-center gap-1.5 font-display text-brand-300">
                      <Briefcase className="h-4 w-4" />
                      {job.company}
                      {job.place && (
                        <span className="flex items-center gap-1 text-sm text-slate-400">
                          · <MapPin className="h-3.5 w-3.5" /> {job.place}
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-display text-xs font-medium text-slate-300">
                    {job.period}
                  </span>
                </div>

                <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-slate-300">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {p}
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {job.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-md bg-brand-500/10 px-2 py-1 font-sans text-[11px] font-medium text-brand-200"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
