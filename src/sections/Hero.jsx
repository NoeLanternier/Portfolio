import DotGrid from '../components/DotGrid/DotGrid'
import { Mouse } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <DotGrid />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/20 to-brand-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-[300px] h-[275px] bg-gradient-to-tr from-brand-600/15 to-purple-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-20 w-[150px] h-[150px] bg-gradient-to-tr from-brand-600/45 to-purple-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-4">
        <h1 className="font-display text-6xl md:text-8xl font-bold bg-gradient-to-tr from-brand-400 to-brand-700 bg-clip-text text-transparent [word-spacing:25px]">
          Noé Lanternier
        </h1>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <Mouse className="w-10 h-10 text-brand-400 animate-bounce" />
      </div>
    </section>
  )
}