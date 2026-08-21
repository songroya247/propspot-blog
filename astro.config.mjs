import { defineConfig } from 'astro/config';

// Deploys as a static site to Cloudflare Pages — no adapter needed.
// If you host this at blog.propspot.ultimateedge.info, leave site/base as-is.
// If you host it at propspot.ultimateedge.info/blog instead, set base: '/blog'.
export default defineConfig({
  site: 'https://blog.propspot.ultimateedge.info',
  output: 'static',
});
