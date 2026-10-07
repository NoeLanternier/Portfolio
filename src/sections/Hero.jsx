import DotGrid from '../components/DotGrid/DotGrid'
import { Mail, Mouse, Briefcase, Download } from 'lucide-react'
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react'
import cvFile from '../assets/CV_Noe_LANTERNIER.pdf'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black pt-4 md:pt-12">
      <DotGrid />

      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-purple-500/25 to-brand-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-[300px] h-[275px] bg-gradient-to-tr from-brand-600/15 to-purple-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-20 -translate-y-1/2 w-[150px] h-[150px] bg-gradient-to-tr from-brand-600/45 to-purple-300/10 rounded-full blur-3xl pointer-events-none" />

      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 px-7 py-3 font-display text-sm md:text-base text-brand-300 font-medium bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition-all">
        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        <a href="#about" className="hover:text-white transition-colors">Education</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </nav>

      <div className="relative z-10 text-center px-4 flex flex-col items-center gap-4">
        <h1 className="font-display text-6xl md:text-8xl font-bold bg-gradient-to-tr from-brand-400 to-brand-700 bg-clip-text text-transparent [word-spacing:14px] pointer-events-none">
          Noé Lanternier
        </h1>

        <div className="flex items-center justify-center gap-3 font-display text-lg md:text-2xl font-medium text-brand-300 pointer-events-none">
          <span>FullStack Developer</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
          <span>Freelancer</span>
        </div>
      </div>

      <div className="relative z-10 text-center px-4 flex flex-col items-center gap-6 pt-12 md:pt-24">
        <div className="flex items-center justify-center gap-5">
          <div className="relative inline-flex group">
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-500 via-purple-500 to-brand-600 rounded-full opacity-80 animate-breathe-slow group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none" />
            <a
              href="#contact"
              className="relative z-10 px-6 py-2.5 font-display text-base font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-full shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <Briefcase className="w-4 h-4" />
              Hire Me
            </a>
          </div>

          <a
            href={cvFile}
            target="_blank"
            rel="noopener noreferrer"
            download="CV_Noe_LANTERNIER.pdf"
            className="px-5 py-2.5 font-display text-base font-medium text-brand-400 bg-white/[0.04] hover:bg-white/[0.08] hover:border-brand-500/40 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all hover:scale-105 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </div>

        <div className="flex gap-6 text-brand-300 pt-2 md:pt-4">
          <a href="https://linkedin.com/in/Noe-Lanternier" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <IconBrandLinkedin className="w-8 h-8" />
          </a>
          <a href="https://github.com/NoeLanternier" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <IconBrandGithub className="w-8 h-8" />
          </a>
          <a href="mailto:noe.lanternier03@gmail.com" className="hover:text-white transition-colors">
            <Mail className="w-8 h-8" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <Mouse className="w-10 h-10 text-brand-500 animate-bounce" />
      </div>
    </section>
  )
}