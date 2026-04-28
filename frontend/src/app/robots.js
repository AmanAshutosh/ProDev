export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://prodev.app'
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/auth', '/practice', '/roadmap', '/interview', '/resume'],
        disallow: ['/api/', '/profile', '/progress', '/livestream', '/ai', '/_next/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
