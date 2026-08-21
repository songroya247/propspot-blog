import { getCollection } from 'astro:content';

export async function GET(context) {
  const now = new Date();
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.publishDate <= now);
  const site = context.site.toString().replace(/\/$/, '');

  const urls = [
    { loc: `${site}/`, priority: '1.0' },
    ...posts.map(post => ({
      loc: `${site}/blog/${post.slug}/`,
      lastmod: post.data.publishDate.toISOString(),
      priority: '0.8',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
                                    }
