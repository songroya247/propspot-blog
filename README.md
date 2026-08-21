# PropSpot Journal

Astro blog, styled to match propspot.ultimateedge.info exactly. Same feature set as blog.ultimateedge.info:

- **Content queue** — write a post with a future `publishDate` and it stays hidden until that date, then goes live automatically (no manual redeploy).
- **RSS feed** — `/rss.xml`
- **Sitemap** — `/sitemap.xml`
- **llms.txt** — `/llms.txt`
- **Structured data (JSON-LD Article schema)** on every post
- **Open Graph + Twitter card tags** on every page
- **Custom 404 page**

## One-time setup

### 1. Deploy to Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`

### 2. Enable the content queue (scheduled rebuild)
Astro builds are a snapshot, so a future-dated post needs the site to rebuild after its date arrives to actually appear. This repo includes `.github/workflows/scheduled-rebuild.yml`, which runs daily and triggers a Cloudflare Pages rebuild.

To wire it up:
1. In Cloudflare Pages → your project → **Settings** → **Deploy hooks** → create a new hook, copy the URL it gives you.
2. In this GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
   - Name: `CF_DEPLOY_HOOK`
   - Value: the deploy hook URL from step 1
3. That's it — the workflow runs every day at 06:00 UTC and picks up any post whose `publishDate` has arrived. You can also trigger it manually from the repo's **Actions** tab any time (Run workflow).

### 3. Writing posts
Use `propspot-blog-cms.html` (the dashboard) rather than editing files directly — it writes correctly-formatted Markdown with all the required frontmatter fields straight into `src/content/blog/`.
