import { useState } from 'react'
import { ArrowUpRight, Check, Copy, LoaderCircle } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'
import { CONTACT } from '../data/profile'
import cvFile from '../assets/CV_Noe_LANTERNIER.pdf'

const field =
  'w-full rounded-md border border-line bg-surface px-4 py-3 text-ink placeholder:text-muted/70 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15'

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${CONTACT.email}`
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy address'}</span>
    </button>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Without a Formspree ID, open the visitor's email app with the message pre-filled.
    if (!CONTACT.formspreeId) {
      const subject = `Portfolio contact from ${data.get('name')}`
      const body = `${data.get('message')}\n\n${data.get('name')} · ${data.get('email')}`
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${CONTACT.formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm">Name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm">Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm">Message</span>
        <textarea name="message" required rows={6} className={`${field} resize-y`} />
      </label>
      {/* Spam trap: hidden from people, filled in by bots. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">
          {status === 'sending' && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Send message
        </button>
        <p role="status" className="text-sm">
          {status === 'sent' && <span className="text-accent">Thank you, your message has been sent.</span>}
          {status === 'error' && (
            <span className="text-red-700">
              The message couldn’t be sent. Please write to {CONTACT.email}.
            </span>
          )}
        </p>
      </div>
    </form>
  )
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-20 md:py-28">
      <div className="page grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <SectionTitle id="contact-title">Contact</SectionTitle>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80">
            Looking for a frontend developer or a UI/UX designer, for a role or a project? Send me an
            email or use the form.
          </p>

          <a
            href={`mailto:${CONTACT.email}`}
            className="mt-8 inline-block break-words font-serif text-[1.65rem] leading-tight link sm:text-4xl md:text-[2.1rem] lg:text-4xl"
          >
            {CONTACT.email}
          </a>
          <div className="mt-3">
            <CopyEmail />
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            <li>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 link">
                LinkedIn <ArrowUpRight className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 link">
                GitHub <ArrowUpRight className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a href={cvFile} download="CV_Noe_LANTERNIER.pdf" className="link">
                Resume (PDF)
              </a>
            </li>
          </ul>
        </div>

        <Reveal className="md:col-span-7 md:pt-3">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
