// Everything the portfolio says about you lives here: edit this file to update the site.

export const CONTACT = {
  email: 'noe.lanternier03@gmail.com',
  linkedin: 'https://www.linkedin.com/in/noe-lanternier',
  github: 'https://github.com/NoeLanternier',
  // Formspree form ID (the part after https://formspree.io/f/). Leave empty and the contact form
  // opens the visitor's email app instead of sending the message directly.
  formspreeId: 'mgaaywpk',
}

export const ABOUT = [
  'I’m a computer science student in my final year at Epitech Strasbourg, with a strong background in low-level programming (C, C++) and modern web development.',
  'After an exchange year at Jönköping School of Engineering in Sweden, I focus on frontend architecture and UI/UX design, from the first Figma mockup to the shipped product, and I’m used to working in fully remote teams across time zones.',
]

export const EXPERIENCE = [
  {
    company: 'HandVision',
    role: 'Frontend Developer & UI/UX Designer',
    period: 'Mar 2025 – Present',
    place: 'Remote',
    points: [
      'Designed the UI/UX of a handball match analysis software in Figma.',
      'Built responsive frontends (SCSS, Tailwind) and migrated the architecture from Next.js (TSX) to Svelte.',
      'Collaborated in a 100% remote team spanning multiple time zones.',
    ],
    tags: ['Figma', 'Svelte', 'Next.js', 'TypeScript', 'Tailwind', 'SCSS'],
  },
  {
    company: 'MOCLI',
    role: 'Frontend Intern',
    period: 'Mar 2025 – Aug 2025',
    points: [
      'Developed and maintained Angular-based web projects.',
      'Designed and implemented interactive game mechanics.',
      'Created and customized CSS theme templates for various games.',
      'Converted the large-screen website into six responsive formats for every device.',
    ],
    tags: ['Angular', 'TypeScript', 'CSS', 'Responsive design'],
  },
  {
    company: 'FIRM service – Socomec',
    role: 'IT Intern',
    period: 'Aug 2023 – Dec 2023',
    points: [
      'Redesigned and developed technical documentation in HTML, CSS and JavaScript, focusing on usability.',
      'Optimized the automated generation of HTML files from XML data with XSLT, making the workflow faster and more reliable.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'XML', 'XSLT'],
  },
]

export const EDUCATION = [
  {
    school: 'Epitech',
    country: 'France',
    degree: 'Master’s Degree in Software Engineering',
    period: '2022 – 2027',
  },
  {
    school: 'Jönköping School of Engineering',
    country: 'Sweden',
    degree: 'Master of UX Design · exchange year',
    period: '2025 – 2026',
  },
  {
    school: 'IUT Louis Pasteur',
    country: 'France',
    degree: 'Associate Degree in Physical Measurements',
    period: '2020 – 2022',
  },
]

export const SKILLS = [
  {
    group: 'Languages',
    items: ['TypeScript', 'JavaScript', 'HTML', 'SCSS', 'Tailwind CSS', 'C', 'C++', 'Python'],
  },
  {
    group: 'Frameworks',
    items: ['React', 'Svelte', 'Angular', 'Vue.js', 'Next.js', 'Node.js', 'Electron'],
  },
  { group: 'Tools', items: ['Git', 'GitHub Actions', 'VS Code', 'Figma', 'Trello'] },
  { group: 'Design', items: ['UI/UX', 'Responsive design', 'Prototyping'] },
]

export const LANGUAGES = [
  { name: 'French', level: 'Fluent', value: 1 },
  { name: 'English', level: 'C1', value: 0.85 },
  { name: 'German', level: 'A2', value: 0.35 },
]
