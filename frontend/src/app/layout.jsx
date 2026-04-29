import './globals.css'
import Providers from '../components/Providers'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://prodev.app'

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'ProDev — Coding Practice, Interview Prep & AI Resume Optimizer',
    template: '%s | ProDev',
  },
  description:
    'Ace your next tech interview and land your dream coding job with ProDev. Practice 150+ topics across Frontend, Backend, DSA, DevOps & System Design. Optimize your resume with AI for maximum ATS score. Free forever.',
  keywords: [
    'coding practice', 'programming practice online', 'tech interview preparation',
    'developer career platform', 'coding interview prep', 'ATS resume optimizer',
    'AI resume builder', 'resume for tech jobs', 'frontend interview questions',
    'backend interview questions', 'DSA practice online', 'system design interview prep',
    'DevOps interview questions', 'developer roadmap', 'software engineer interview',
    'coding coaching', 'tech career growth', 'programming jobs', 'full stack developer practice',
    'learn to code', 'coding platform free', 'interview preparation platform',
    'career guidance for developers', 'coding bootcamp alternative', 'tech job preparation',
    'JavaScript interview', 'React interview questions', 'Node.js interview',
    'database interview questions', 'cloud computing practice', 'system design questions',
    'data structures algorithms', 'LeetCode alternative', 'coding interview platform',
  ],
  authors: [{ name: 'ProDev' }],
  creator: 'ProDev',
  publisher: 'ProDev',
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'ProDev',
    title: 'ProDev — Developer Career Platform',
    description:
      'Master coding, crush interviews, and optimize your resume with AI. The all-in-one platform for developers serious about their career.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'ProDev — Developer Career Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProDev — Developer Career Platform',
    description:
      'Practice 150+ coding topics, ace tech interviews, and optimize your resume with AI. Free forever.',
    images: ['/opengraph-image'],
    creator: '@prodevapp',
  },
  alternates: { canonical: baseUrl },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>",
    apple: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>",
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'ProDev',
      description: 'Developer Career Platform — Coding Practice, Interview Prep & AI Resume Optimizer',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/practice?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'ProDev',
      url: baseUrl,
      logo: { '@type': 'ImageObject', url: `${baseUrl}/opengraph-image` },
      description:
        'Developer career platform offering coding practice, interview preparation, and AI-powered resume optimization.',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${baseUrl}/#app`,
      name: 'ProDev',
      url: baseUrl,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      description:
        'Practice coding across 6 tech domains, prepare for technical interviews, and optimize your resume with AI for ATS systems.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        'Coding practice across 150+ topics',
        'Frontend, Backend, DSA, DevOps, System Design, Databases',
        'AI-powered ATS resume optimizer',
        'Interview preparation questions',
        'Progress tracking and activity heatmap',
        'Interactive developer roadmap',
        'Live coding stream integration',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is ProDev free to use?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, ProDev is completely free. No credit card required.' },
        },
        {
          '@type': 'Question',
          name: 'What coding topics can I practice on ProDev?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ProDev covers 150+ topics across Frontend (HTML, CSS, JavaScript, React), Backend (Node.js, APIs), DSA (Data Structures & Algorithms), Databases (SQL, MongoDB), DevOps (Docker, CI/CD), and System Design.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the AI resume optimizer work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Upload your resume (PDF or DOCX) and paste a job description. Our AI analyzes keyword gaps, rewrites your resume for ATS systems, and lets you download the optimized version as PDF or DOCX.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{
          __html: `try{var t=localStorage.getItem('pj-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`
        }} />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
