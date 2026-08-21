import { getCollection } from 'astro:content';

export async function GET(context) {
  const now = new Date();
  const posts = (await getCollection('blog', ({ data }) => !data.draft && data.publishDate <= now))
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
  const site = context.site.toString().replace(/\/$/, '');

  const lines = [
    '# PropSpot Journal',
    '',
    '> Guides, neighborhood insight, and practical advice on renting, buying, and finding your next place in Nigeria.',
    '',
    '## Posts',
    '',
    ...posts.map(post => `- [${post.data.title}](${site}/blog/${post.slug}/): ${post.data.excerpt}`),
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
  }
