import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'
import { ABOUT, EDUCATION, LANGUAGES, SKILLS } from '../data/profile'

function Block({ title, children, className = '' }) {
  return (
    <div className={`border-t border-ink pt-5 ${className}`}>
      <h3 className="font-medium">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line py-20 md:py-28">
      <div className="page grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <SectionTitle id="about-title">About</SectionTitle>
        </div>

        <div className="md:col-span-8">
          <Reveal className="flex flex-col gap-5 text-xl leading-relaxed md:pt-2">
            {ABOUT.map((p, i) => (
              <p key={i} className={i ? 'text-ink/80' : ''}>
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal className="mt-16 grid gap-12 sm:grid-cols-2 sm:gap-x-10">
            <Block title="Skills">
              <dl className="flex flex-col gap-3">
                {SKILLS.map(({ group, items }) => (
                  <div key={group}>
                    <dt className="text-sm text-muted">{group}</dt>
                    <dd className="mt-0.5">{items.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </Block>

            <Block title="Languages">
              <ul className="flex flex-col gap-1.5">
                {LANGUAGES.map(({ name, level }) => (
                  <li key={name}>
                    {name} <span className="text-muted">· {level}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Education" className="sm:col-span-2">
              <ul className="grid gap-5 lg:grid-cols-3 lg:gap-8">
                {EDUCATION.map((e) => (
                  <li key={e.school}>
                    <p>{e.school}</p>
                    <p className="text-sm leading-relaxed text-muted">
                      {e.degree} · <span className="tabular-nums">{e.period}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </Block>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
