import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// The live site sits at the root of its own domain. The preview copy on GitHub
// Pages sits in a sub-folder (/<repo>/): the preview build sets SITE_BASE to that
// folder, and every root-relative link in the built pages is prefixed to match.
const base = (process.env.SITE_BASE ?? '').replace(/\/+$/, '');

const prefixRootLinks = {
  name: 'prefix-root-links',
  hooks: {
    'astro:build:done': ({ dir }) => {
      if (!base) return;
      const folder = base.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const rootLink = new RegExp(`\\b(href|src|action)="/(?!/|${folder}(?:/|"))`, 'g');
      const walk = (current) => {
        for (const entry of readdirSync(current, { withFileTypes: true })) {
          const path = join(current, entry.name);
          if (entry.isDirectory()) walk(path);
          else if (path.endsWith('.html')) {
            writeFileSync(path, readFileSync(path, 'utf8').replace(rootLink, `$1="${base}/`));
          }
        }
      };
      walk(fileURLToPath(dir));
    },
  },
};

export default defineConfig({
  site: 'https://sanjaysharmarealty.com',
  base: base || '/',
  integrations: [prefixRootLinks],
});
