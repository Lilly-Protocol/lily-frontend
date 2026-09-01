// pages/robots.ts
import { GetServerSideProps } from 'next';

const robots = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain');
  
  const sitemapUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lilly-protocol.github.io/lily-frontend';
  
  // Generate sitemap entries excluding /app routes
  const sitemapEntries = [
    '/',
    '/docs',
    '/docs/getting-started',
    '/docs/api',
    '/blog',
    '/community',
    '/resources'
  ].map(path => `${sitemapUrl}${path}`).join('\nSitemap: ');

  res.end(`User-agent: *
Allow: /

Sitemap: ${sitemapEntries}
`);
  
  return { props: {} };
};

export default robots;