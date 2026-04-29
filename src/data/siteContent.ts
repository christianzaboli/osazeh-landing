export type LinkItem = {
  label: string
  href: string
  note: string
}

export type Project = {
  title: string
  type: string
  summary: string,
  image?: string,
  stack: string[]
  status: string
  link: string
}

export const profile = {
  name: 'Christian Zaboli Vedovi',
  role: 'Frontend developer',
  location: ['Brescia', 'Milano', 'Remote'],
  signal: 'Sistemi frontend, interfacce prodotto e cura del dettaglio nelle interazioni.',
  intro:
    'Trasformo idee di prodotto in interfacce responsive, chiare e piacevoli da usare.',
  about:
    'Il mio lavoro migliore sta tra design e sviluppo: costruire sistemi di componenti, rifinire le interazioni e creare basi frontend che un team possa far crescere nel tempo.',
  availability:
    'Sono un junior frontend developer in cerca di opportunita a Brescia, Milano o da remoto, aperto a collaborazioni, freelance e team di prodotto.',
}

export const links: LinkItem[] = [
  { label: 'GitHub', href: 'https://github.com/christianzaboli', note: 'Codice, esperimenti, repository' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/christianzabolivedovi/', note: 'Aggiornamenti e contatti' },
  { label: 'Email', href: 'mailto:zabolichristian@gmail.com', note: 'Richieste di progetto e messaggi' },
  { label: 'CV', href: '/christian_zaboli_vedovi_cv_frontend.pdf', note: 'Clicca qui per visualizzare' },
]

export const projects: Project[] = [
  {
    title: 'Space Domicile',
    type: 'E-commerce',
    image: 'brand/previews/space_domicile.png',
    summary:
      'Progetto nato in team e poi portato avanti in autonomia, con refactor di circa l’80% del codice e nuove strategie e funzionalita.',
    stack: ['React', 'MySQL', 'Node.js', 'Vercel', 'Render', 'Pagamenti'],
    status: 'In corso',
    link: 'https://space-domicile.vercel.app'
  },
  {
    title: 'Earth',
    type: 'Test R3F',
    image: 'brand/previews/earth_R3F.gif',
    summary:
      'Un test che ricrea la terra attraverso forme semplici e un lavoro di rifinitura sulle texture.',
    stack: ['Vite', 'Three.js', 'React', 'R3F'],
    status: 'Prototipo',
    link: 'https://github.com/christianzaboli/R3F_hello_world'
  },
]

export const stack = [
  'React.js',
  'TypeScript',
  'Node.js',
  'MySQL',
  'Git',
  'TailwindCSS',
  'GSAP',
  'Three.js',
  'R3F',
  'Design systems',
  'Motion UI',
  'Gaming'
]

export const principles = ['Sistemi puliti', 'Interfacce curate', 'Motion utile', 'Attenzione ai dettagli']
export type sectionName = "links" | "about" | "projects";
