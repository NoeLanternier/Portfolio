// Everything the portfolio says about you lives here: edit this file to update the site.

export const PROFILE = {
  name: 'Noé Lanternier',
  location: 'Strasbourg, France',
  title: 'Frontend developer',
  titleSecond: '& UI/UX designer',
  intro:
    'I design interfaces in Figma and build them for the web. Right now I’m working on HandVision, a match analysis app for handball coaches, while finishing my master’s at Epitech Strasbourg.',
  availability:
    'Open to internships, part-time and full-time roles, in Strasbourg or remote. Freelance projects are welcome too.',
}

export const CONTACT = {
  email: 'noe.lanternier03@gmail.com',
  linkedin: 'https://www.linkedin.com/in/noe-lanternier',
  github: 'https://github.com/NoeLanternier',
  // Formspree form ID (the part after https://formspree.io/f/). Leave empty and the contact form
  // opens the visitor's email app instead of sending the message directly.
  formspreeId: 'mgaaywpk',
}

export const ABOUT = [
  'I’m finishing a master’s in software engineering at Epitech Strasbourg, where I learned to program from the ground up in C and C++. I then spent an exchange year in Jönköping, Sweden, following courses from the UI/UX design master’s programme.',
  'Today I work on both sides of the interface: I draw it in Figma, then I build it with React, Svelte or Angular, depending on the project. Most of my work so far has been done in remote teams spread across several countries.',
]

export const EXPERIENCE = [
  {
    company: 'HandVision',
    role: 'Frontend developer & UI/UX designer',
    period: 'Mar 2025 – present',
    place: 'Remote',
    points: [
      'Designed the stats page in Figma and built the app’s pages with the team, for large screens and mobile.',
      'Took part in moving the frontend from Next.js to Svelte.',
      'Six people working remotely from Sweden, Ireland, Germany and South Korea.',
    ],
    tags: ['Figma', 'Svelte', 'TypeScript', 'Tailwind CSS', 'SCSS'],
  },
  {
    company: 'MOCLI',
    role: 'Frontend intern',
    period: 'Mar – Aug 2025',
    points: [
      'Developed and maintained Angular web projects, including interactive game mechanics.',
      'Created CSS theme templates for the different games.',
      'Adapted the large-screen website to six screen formats.',
    ],
    tags: ['Angular', 'TypeScript', 'CSS'],
  },
  {
    company: 'FIRM service – Socomec',
    role: 'IT intern',
    period: 'Aug – Dec 2023',
    points: [
      'Redesigned technical documentation in HTML, CSS and JavaScript to make it easier to use.',
      'Made the generation of HTML files from XML data (XSLT) faster and more reliable.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'XSLT'],
  },
]

export const EDUCATION = [
  {
    school: 'Epitech Strasbourg',
    degree: 'Master’s in software engineering',
    period: '2022 – 2027',
  },
  {
    school: 'Jönköping School of Engineering, Sweden',
    degree: 'Exchange year · courses from the UI/UX design master’s programme',
    period: '2025 – 2026',
  },
  {
    school: 'IUT Louis Pasteur',
    degree: 'Associate degree in physical measurements',
    period: '2020 – 2022',
  },
]

export const SKILLS = [
  { group: 'Design', items: ['Figma', 'UI/UX design', 'Responsive design'] },
  { group: 'Frontend', items: ['TypeScript', 'React', 'Svelte', 'Angular', 'Tailwind CSS', 'SCSS'] },
  { group: 'Other', items: ['Git', 'C / C++'] },
]

export const LANGUAGES = [
  { name: 'French', level: 'fluent' },
  { name: 'English', level: 'C1' },
  { name: 'German', level: 'A2' },
]
