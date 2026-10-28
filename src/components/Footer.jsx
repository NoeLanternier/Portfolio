import { ArrowUp, Mail } from 'lucide-react'
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'
import { CONTACT } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-8 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Noé Lanternier · Built with React, Tailwind CSS &amp; Vite
        </p>
        <div className="flex items-center gap-4 text-brand-300">
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-white">
            <IconBrandLinkedin className="h-5 w-5" />
          </a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-white">
            <IconBrandGithub className="h-5 w-5" />
          </a>
          <a href={`mailto:${CONTACT.email}`} aria-label="Email" className="transition-colors hover:text-white">
            <Mail className="h-5 w-5" />
          </a>
          <a
            href="#top"
            className="ml-2 flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 font-display text-xs transition-colors hover:border-brand-500/40 hover:text-white"
          >
            <ArrowUp className="h-3.5 w-3.5" /> Top
          </a>
        </div>
      </div>
    </footer>
  )
}
