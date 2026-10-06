import DotGrid from '../components/DotGrid/DotGrid'
import { Mouse } from 'lucide-react'
import { Mail } from 'lucide-react'
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <DotGrid />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/20 to-brand-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-[300px] h-[275px] bg-gradient-to-tr from-brand-600/15 to-purple-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-20 w-[150px] h-[150px] bg-gradient-to-tr from-brand-600/45 to-purple-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-4 flex flex-col items-center gap-4">
        <h1 className="font-display text-6xl md:text-8xl font-bold bg-gradient-to-tr from-brand-400 to-brand-700 bg-clip-text text-transparent [word-spacing:25px] pointer-events-none">
          Noé Lanternier
        </h1>
        <div className="flex items-center justify-center gap-3 font-display text-lg md:text-2xl font-medium text-brand-300 pointer-events-none">
          <span>Frontend Developer</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
          <span>Freelancer</span>
        </div>
        <div className="flex gap-6 text-brand-300 pt-20">
          <a href="https://linkedin.com/in/Noe-Lanternier" target="_blank" rel="noopener noreferrer">
            <IconBrandLinkedin className="w-9 h-9 hover:text-white transition-colors cursor-pointer" />
          </a>
          <a href="https://github.com/NoeLanternier" target="_blank" rel="noopener noreferrer">
            <IconBrandGithub className="w-9 h-9 hover:text-white transition-colors cursor-pointer" />
          </a>
          <a href="mailto:noe.lanternier03@gmail.com">
            <Mail className="w-9 h-9 hover:text-white transition-colors cursor-pointer" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <Mouse className="w-10 h-10 text-brand-500 animate-bounce" />
      </div>
    </section>
  )
}