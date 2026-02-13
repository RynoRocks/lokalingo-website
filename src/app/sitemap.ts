import type { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { blogPosts, getLocalizedSlug } from '@/lib/blog';

const baseUrl = 'https://lokalingo.com';

const staticPages = [
  '',
  '/for-educators',
  '/for-learners',
  '/for-schools',
  '/pricing',
  '/the-loka-story',
  '/blog',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/pricing' ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      });
    }
  }

  // Blog posts
  for (const post of blogPosts) {
    for (const locale of locales) {
      const slug = getLocalizedSlug(post, locale);
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/blog/${getLocalizedSlug(post, l)}`])
          ),
        },
      });
    }
  }

  return entries;
}
