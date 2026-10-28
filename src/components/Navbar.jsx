import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

// Floating navigation: highlights the section currently on screen.
export default function Navbar() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (!sections.length || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      // A section is "active" when it crosses the middle of the screen.
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    // Back on the hero: nothing highlighted.
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <nav
      aria-label="Main"
      className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/70 p-1.5 font-display text-[13px] font-medium text-brand-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md sm:top-8 sm:gap-2 sm:text-sm md:text-base"
    >
      <a
        href="#top"
        aria-label="Back to top"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-brand-500 to-brand-800 text-xs font-bold text-white sm:h-9 sm:w-9"
      >
        NL
      </a>
      {LINKS.map((l) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          aria-current={active === l.id ? 'true' : undefined}
          className={`rounded-full px-2 py-1.5 transition-colors sm:px-4 ${active === l.id ? 'bg-brand-600/30 text-white' : 'hover:text-white'}`}
        >
          {l.label}
        </a>
      ))}
    </nav>
  )
}
