// Fails while stand-in content is still in the built site.
// Run `npm run build` first, then `npm run check:launch`.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
if (!existsSync(dist)) {
  console.error('No dist/ folder. Run `npm run build` first.');
  process.exit(1);
}

const pages = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.html')) pages.push(path);
  }
};
walk(dist);

const checks = [
  { name: 'Placeholder blocks ("content needed")', test: (html) => html.includes('data-placeholder') },
  { name: 'Sample listings, sales or testimonials', test: (html) => html.includes('tag--sample') },
  { name: 'Stand-in phone number (555-01xx)', test: (html) => /555-01\d\d/.test(html) },
  { name: 'Forms with no endpoint (falls back to email app)', test: (html) => /data-endpoint(="")?[\s>]/.test(html) },
];

let failed = false;
for (const check of checks) {
  const hits = pages.filter((p) => check.test(readFileSync(p, 'utf8'))).map((p) => p.replace(dist, '/'));
  if (hits.length) {
    failed = true;
    console.log(`\n✗ ${check.name}\n  ${hits.join('\n  ')}`);
  } else {
    console.log(`✓ ${check.name}: none`);
  }
}

console.log(failed ? '\nNot ready to launch.' : '\nReady: no stand-in content found.');
process.exit(failed ? 1 : 0);
