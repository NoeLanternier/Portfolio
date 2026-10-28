import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'
import HandVision from '../components/work/HandVision'
import TacticalAnalyzer from '../components/work/TacticalAnalyzer'

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line py-20 md:py-28">
      <div className="page">
        <SectionTitle id="work-title">Selected work</SectionTitle>

        <Reveal className="mt-14 md:mt-20">
          <HandVision />
        </Reveal>

        <Reveal className="mt-24 border-t border-line pt-16 md:mt-32 md:pt-20">
          <TacticalAnalyzer />
        </Reveal>
      </div>
    </section>
  )
}
