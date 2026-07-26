import type { MetadataRoute } from 'next';

const SITE_URL = 'https://goodmanconsulting.in';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function safeFetchList(path: string): Promise<{ slug: string; updated_at?: string }[]> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/work`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/pricing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const [blogPosts, caseStudies] = await Promise.all([
    safeFetchList('/api/blog'),
    safeFetchList('/api/case-studies'),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const workRoutes: MetadataRoute.Sitemap = caseStudies.map((item) => ({
    url: `${SITE_URL}/work/${item.slug}`,
    lastModified: item.updated_at,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...workRoutes];
}
