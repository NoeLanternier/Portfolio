import { GraduationCap } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { ABOUT, EDUCATION, LANGUAGES, SKILLS } from '../data/profile'

const card =
  'rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md md:p-6'
const cardTitle = 'font-display text-sm font-semibold uppercase tracking-widest text-brand-400'

export default function About() {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-black px-4 pb-16 pt-24 md:px-8">
      <div className="pointer-events-none absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-purple-500/10 to-brand-800/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10">
        <SectionHeader title="About me" subtitle="Education, skills and languages." />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-5">
            <Reveal className={card}>
              <h3 className={cardTitle}>Who I am</h3>
              <div className="mt-3 flex flex-col gap-3 leading-relaxed text-slate-300">
                {ABOUT.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80} className={card}>
              <h3 className={cardTitle}>Skills</h3>
              <div className="mt-4 flex flex-col gap-4">
                {SKILLS.map((g) => (
                  <div key={g.group} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                    <span className="w-24 shrink-0 pt-1 font-display text-sm text-slate-400">{g.group}</span>
                    <ul className="flex flex-wrap gap-1.5">
                      {g.items.map((s) => (
                        <li
                          key={s}
                          className="rounded-md bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-200"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-5">
            <Reveal delay={120} className={card}>
              <h3 className={cardTitle}>Education</h3>
              <ol className="mt-4 flex flex-col gap-5">
                {EDUCATION.map((e) => (
                  <li key={e.school} className="flex gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                      <GraduationCap className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <h4 className="font-display text-base font-semibold text-white">
                          {e.school}
                          <span className="font-sans text-sm font-normal text-slate-400"> · {e.country}</span>
                        </h4>
                        <span className="font-display text-xs text-slate-400">{e.period}</span>
                      </div>
                      <p className="text-sm text-brand-200">{e.degree}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={160} className={card}>
              <h3 className={cardTitle}>Languages</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {LANGUAGES.map((l) => (
                  <li key={l.name} className="flex items-center gap-3 text-sm">
                    <span className="w-16 shrink-0 text-slate-200">{l.name}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-brand-500 to-purple-300"
                        style={{ width: `${l.value * 100}%` }}
                      />
                    </span>
                    <span className="w-14 shrink-0 text-right font-display text-xs text-slate-400">{l.level}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
