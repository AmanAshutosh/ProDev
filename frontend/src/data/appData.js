import { FRONTEND_DOMAIN, FRONTEND_QUESTIONS } from './domains/frontend'
import { BACKEND_DOMAIN,  BACKEND_QUESTIONS  } from './domains/backend'
import { DSA_DOMAIN,      DSA_QUESTIONS       } from './domains/dsa'
import { DATABASE_DOMAIN, DATABASE_QUESTIONS  } from './domains/database'
import { DEVOPS_DOMAIN,   DEVOPS_QUESTIONS    } from './domains/devops'
import { SYSDESIGN_DOMAIN, SYSDESIGN_QUESTIONS } from './domains/systemDesign'

export { FRONTEND_QUESTIONS } from './domains/frontend'
export { BACKEND_QUESTIONS  } from './domains/backend'
export { DSA_QUESTIONS       } from './domains/dsa'
export { DATABASE_QUESTIONS  } from './domains/database'
export { DEVOPS_QUESTIONS    } from './domains/devops'
export { SYSDESIGN_QUESTIONS } from './domains/systemDesign'

export const PRACTICE_DOMAINS = [
  FRONTEND_DOMAIN,
  BACKEND_DOMAIN,
  DSA_DOMAIN,
  DATABASE_DOMAIN,
  DEVOPS_DOMAIN,
  SYSDESIGN_DOMAIN,
]

export const ROADMAP_STAGES = [
  {
    id: 'web-basics',
    num: '01',
    label: 'Web Fundamentals',
    sub: 'HTML · CSS · JS · Git',
    icon: 'Globe',
    gradient: 'gradient-purple',
    progress: 100,
    nodes: [
      { label: 'HTML5 & Semantics',  status: 'done' },
      { label: 'CSS3 & Layouts',     status: 'done' },
      { label: 'JavaScript ES6+',    status: 'done' },
      { label: 'Git & GitHub',       status: 'done' },
      { label: 'HTTP Basics',        status: 'done' },
      { label: 'Browser DevTools',   status: 'done' },
    ],
  },
  {
    id: 'frontend',
    num: '02',
    label: 'Frontend Framework',
    sub: 'React · TypeScript · Testing',
    icon: 'Layers',
    gradient: 'gradient-teal',
    progress: 0,
    nodes: [
      { label: 'React Fundamentals', status: 'done' },
      { label: 'React Hooks',        status: 'done' },
      { label: 'State Management',   status: 'active' },
      { label: 'React Router',       status: 'pending' },
      { label: 'TypeScript',         status: 'pending' },
      { label: 'Testing (Jest/RTL)', status: 'pending' },
    ],
  },
  {
    id: 'backend',
    num: '03',
    label: 'Backend Development',
    sub: 'Node.js · Express · APIs',
    icon: 'Server',
    gradient: 'gradient-amber',
    progress: 0,
    nodes: [
      { label: 'Node.js',        status: 'done' },
      { label: 'Express.js',     status: 'done' },
      { label: 'REST APIs',      status: 'active' },
      { label: 'Authentication', status: 'pending' },
      { label: 'GraphQL',        status: 'pending' },
      { label: 'WebSockets',     status: 'pending' },
    ],
  },
  {
    id: 'database',
    num: '04',
    label: 'Databases',
    sub: 'SQL · NoSQL · Caching',
    icon: 'Database',
    gradient: 'gradient-pink',
    progress: 0,
    nodes: [
      { label: 'SQL Basics',     status: 'done' },
      { label: 'PostgreSQL',     status: 'active' },
      { label: 'MongoDB',        status: 'pending' },
      { label: 'Redis',          status: 'pending' },
      { label: 'ORMs / Prisma',  status: 'pending' },
    ],
  },
  {
    id: 'devops',
    num: '05',
    label: 'DevOps & Cloud',
    sub: 'Docker · CI/CD · AWS',
    icon: 'Cloud',
    gradient: 'gradient-indigo',
    progress: 0,
    nodes: [
      { label: 'Linux Basics',      status: 'done' },
      { label: 'Docker',            status: 'active' },
      { label: 'CI/CD Pipelines',   status: 'pending' },
      { label: 'Kubernetes',        status: 'pending' },
      { label: 'AWS / GCP',         status: 'pending' },
      { label: 'Monitoring',        status: 'pending' },
    ],
  },
]

export const ROADMAP_EXTERNAL = [
  { label: 'Full-Stack', url: 'https://roadmap.sh/full-stack', icon: 'Layers',  color: '#6c63ff' },
  { label: 'Frontend',   url: 'https://roadmap.sh/frontend',   icon: 'Monitor', color: '#38b2ac' },
  { label: 'Backend',    url: 'https://roadmap.sh/backend',    icon: 'Server',  color: '#f7971e' },
  { label: 'DevOps',     url: 'https://roadmap.sh/devops',     icon: 'Cloud',   color: '#ff6584' },
]

export const ACHIEVEMENTS = [
  { label: '7-Day Streak',       desc: 'Earned today',            icon: 'Flame',  gradient: 'gradient-amber',  done: true },
  { label: '248 / 250 Problems', desc: '2 left to unlock',        icon: 'Code2',  gradient: 'gradient-purple', done: false, progress: 248, max: 250 },
  { label: '142 Study Hours',    desc: 'Earned last week',        icon: 'Clock',  gradient: 'gradient-green',  done: true },
  { label: 'React Certified',    desc: 'Complete React stage',    icon: 'Award',  gradient: 'gradient-teal',   done: false },
]
