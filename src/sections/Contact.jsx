import { useState } from 'react'
import { Check, Copy, Download, LoaderCircle, Mail, Send } from 'lucide-react'
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { CONTACT } from '../data/profile'
import cvFile from '../assets/CV_Noe_LANTERNIER.pdf'

const field =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-brand-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-brand-500/20'

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
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 pl-4">
      <Mail className="h-5 w-5 shrink-0 text-brand-400" />
      <a href={`mailto:${CONTACT.email}`} className="min-w-0 flex-1 truncate text-sm text-slate-200 hover:text-white sm:text-base">
        {CONTACT.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="flex shrink-0 items-center gap-1.5 rounded-xl bg-white/[0.06] px-3 py-2 font-display text-xs font-medium text-brand-300 transition hover:bg-brand-600 hover:text-white"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
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
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-display text-sm text-slate-300">Name</span>
          <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-display text-sm text-slate-300">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={field}
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="font-display text-sm text-slate-300">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project, timeline and budget…"
          className={`${field} resize-y`}
        />
      </label>
      {/* Spam trap: hidden from people, filled in by bots. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="flex items-center gap-2 rounded-full bg-brand-600 px-6 py-2.5 font-display text-sm font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.45)] transition-all hover:scale-105 hover:bg-brand-500 active:scale-95 disabled:opacity-60"
        >
          {status === 'sending' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send message
        </button>
        <p role="status" className="text-sm">
          {status === 'sent' && <span className="text-emerald-300">Thanks! I’ll get back to you soon.</span>}
          {status === 'error' && (
            <span className="text-red-300">
              Something went wrong. Please email me directly at {CONTACT.email}.
            </span>
          )}
        </p>
      </div>
    </form>
  )
}

const linkClass =
  'flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-display text-sm text-brand-300 transition-all hover:scale-105 hover:border-brand-500/40 hover:text-white'

export default function Contact() {
  return (
    <section id="contact" className="relative w-full overflow-hidden bg-black px-4 pb-20 pt-24 md:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-500/15 to-brand-900/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10">
        <SectionHeader title="Contact" subtitle="Have a project in mind? Let’s talk." />

        <Reveal className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md md:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">Let’s build something great</h3>
              <p className="mt-2 leading-relaxed text-slate-400">
                Freelance missions, full-time or part-time roles: send me a message here or reach
                out by email.
              </p>
            </div>
            <CopyEmail />
            <div className="flex flex-wrap gap-2.5">
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <IconBrandLinkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <IconBrandGithub className="h-4 w-4" /> GitHub
              </a>
              <a href={cvFile} download="CV_Noe_LANTERNIER.pdf" className={linkClass}>
                <Download className="h-4 w-4" /> Resume
              </a>
            </div>
          </div>

          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
