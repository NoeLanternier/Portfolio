# Noé Lanternier · Portfolio

Personal portfolio: **https://noelanternier.github.io/Portfolio/**

Built with React 19, Vite, Tailwind CSS and lucide icons. Fonts: Instrument Serif and Inter
(Google Fonts). Deployed to GitHub Pages by
GitHub Actions on every push to `main` (`.github/workflows/deploy.yml`).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173/Portfolio/
npm run build    # production build in dist/
npm run lint
```

## Update the content

| What | Where |
| --- | --- |
| Hero text, availability, experience, education, skills, languages, about text, links | `src/data/profile.js` |
| Contact form (Formspree ID) | `CONTACT.formspreeId` in `src/data/profile.js` |
| Projects (texts and images) | `src/components/work/HandVision.jsx`, `src/components/work/TacticalAnalyzer.jsx` |
| Project images, demo video | `src/assets/projects/handvision/`, `src/assets/projects/tactique/` |
| Portrait | `src/assets/portrait.webp` |
| Colours and fonts | `tailwind.config.js`, `index.html` |
| Resume | `src/assets/CV_Noe_LANTERNIER.pdf` |
| Title, description, social preview | `index.html`, `public/og-image.png` |

### Contact form

Without a Formspree ID the form opens the visitor's email app with the message pre-filled. To
receive messages directly: create a free form on [formspree.io](https://formspree.io), copy its
ID (the end of `https://formspree.io/f/xxxxxxx`) into `CONTACT.formspreeId`, then push.
