import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const now = new Date();
  const posts = (await getCollection('blog', ({ data }) => !data.draft && data.publishDate <= now))
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  return rss({
    title: 'PropSpot Journal',
    description: 'Guides, neighborhood insight, and practical advice on renting, buying, and finding your next place in Nigeria.',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.publishDate,
      link: `/blog/${post.slug}/`,
    })),
  });
                                     }
