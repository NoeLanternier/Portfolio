import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import DotField from '../components/DotField'
import { PROFILE } from '../data/profile'
import cvFile from '../assets/CV_Noe_LANTERNIER.pdf'

export default function Hero() {
  const sectionRef = useRef(null)

  return (
    <section id="top" ref={sectionRef} className="relative overflow-hidden">
      {/* Interactive floor of dots, under the content. Its far edge fades out. */}
      <div className="absolute inset-x-0 bottom-0 h-[clamp(220px,38vh,400px)] [mask-image:linear-gradient(to_bottom,transparent,black_45%)]">
        <DotField targetRef={sectionRef} />
      </div>

      <div className="page relative pb-[clamp(190px,30vh,320px)] pt-28 md:pt-36">
        <p className="text-muted">
          {PROFILE.name} · {PROFILE.location}
        </p>

        <h1 className="mt-6 font-serif text-[3.4rem] leading-[0.95] tracking-tight sm:text-7xl lg:text-[6.5rem]">
          {PROFILE.title}
          <br />
          <em className="text-accent">{PROFILE.titleSecond}</em>
        </h1>

        <div className="mt-10 grid gap-4 md:grid-cols-12 md:gap-10">
          <p className="text-lg leading-relaxed text-ink/85 md:col-span-6">{PROFILE.intro}</p>
          <p className="leading-relaxed text-muted md:col-span-5 md:col-start-8 md:pt-1">
            {PROFILE.availability}
          </p>
        </div>

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
    </section>
  )
}
