import { ArrowDown } from 'lucide-react'
import { PROFILE } from '../data/profile'
import portrait from '../assets/portrait.webp'
import cvFile from '../assets/CV_Noe_LANTERNIER.pdf'

export default function Hero() {
  return (
    <section id="top" className="page pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="grid items-end gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <p className="text-muted">
            {PROFILE.name} · {PROFILE.location}
          </p>
          <h1 className="mt-5 font-serif text-[3.4rem] leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.6rem]">
            {PROFILE.title}
            <br />
            <em className="text-accent">{PROFILE.titleSecond}</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/85">{PROFILE.intro}</p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">{PROFILE.availability}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#contact" className="btn-primary">
              Get in touch
            </a>
            <a href="#work" className="inline-flex items-center gap-1.5 text-sm font-medium link">
              See my work <ArrowDown className="h-4 w-4" />
            </a>
            <a href={cvFile} download="CV_Noe_LANTERNIER.pdf" className="text-sm font-medium link">
              Resume (PDF)
            </a>
          </div>
        </div>

        <figure className="md:col-span-5">
          <img
            src={portrait}
            alt="Portrait of Noé Lanternier"
            width="960"
            height="1200"
            className="aspect-[4/5] w-full max-w-sm rounded-sm object-cover md:ml-auto md:max-w-none"
          />
        </figure>
      </div>
    </section>
  )
}
