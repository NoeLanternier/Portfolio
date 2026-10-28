import { useEffect, useRef, useState } from 'react'

// Fades its content in the first time it scrolls into view
// (instant for visitors who prefer reduced motion).
export default function Reveal({ children, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  // Shown immediately when animations are unwanted or unsupported.
  const [visible, setVisible] = useState(
    () =>
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  return (
    <Tag
      ref={ref}
      className={`transition duration-500 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'} ${className}`}
    >
      {children}
    </Tag>
  )
}
