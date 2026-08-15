import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const ORIGIN = 'https://michaelndhlovu.vercel.app';
const ROOT = new URL('../', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');

const routes = [
  {
    path: '/work',
    title: 'Selected Work | Michael Ndhlovu 3D & Digital Portfolio',
    description: 'Selected production work by Michael Ndhlovu across 3D design, visualization, branded environments and interactive digital experiences for Netflix, SEGA, Mercedes-Benz and other brands.',
    image: '/renders/netflix/netflix-hero.webp',
    imageAlt: 'Netflix multi-show launch display 3D portfolio project by Michael Ndhlovu'
  },
  {
    path: '/services',
    title: 'Software Development, 3D Design & VR Solutions | Michael Ndhlovu',
    description: 'Software development, web and app development, 3D design and visualization, and VR solutions by Michael Ndhlovu for products, platforms, brands and immersive experiences.',
    image: '/renders/assets/what-do-assets (4).webp',
    imageAlt: 'Software development, 3D design and VR services by Michael Ndhlovu'
  },
  {
    path: '/about',
    title: 'About Michael Ndhlovu | Software, 3D & VR',
    description: 'Learn about Michael Ndhlovu, a South African software developer, senior 3D generalist and immersive experience designer working across software, 3D production and VR.',
    image: '/renders/assets/approach-assets (1).webp',
    imageAlt: 'Michael Ndhlovu portfolio approach and creative practice'
  },
  {
    path: '/contact',
    title: 'Contact Michael Ndhlovu | Software, 3D & VR Projects',
    description: 'Contact Michael Ndhlovu to discuss software development, web or app development, 3D design and visualization, VR solutions, or multidisciplinary digital experience work.',
    image: '/renders/assets/approach-assets (3).webp',
    imageAlt: 'Contact Michael Ndhlovu for software, 3D and VR projects'
  },
  {
    path: '/work/netflix-multi-show-launch-display',
    title: 'Netflix Multi-Show Launch Display | 3D Case Study | Michael Ndhlovu',
    description: 'Designed launch display installations for Netflix flagship shows including Stranger Things, Wednesday, One Piece and Squid Game, including branded vehicle concepts and detailed 3D assets.',
    image: '/renders/netflix/netflix-hero.webp',
    imageAlt: 'Netflix multi-show launch display 3D case study by Michael Ndhlovu'
  },
  {
    path: '/work/arknights-endfield-gamescom-2025-stand',
    title: 'Arknights Endfield Gamescom 2025 Stand | 3D Case Study | Michael Ndhlovu',
    description: '3D exhibition booth work for Arknights: Endfield at Gamescom 2025, including environment modeling, UV preparation, texturing, staff elements and character cutouts.',
    image: '/renders/arknights-endfield/arknights-endfiield-hero.webp',
    imageAlt: 'Arknights Endfield Gamescom 2025 stand 3D case study by Michael Ndhlovu'
  },
  {
    path: '/work/sonic-racing-crossworlds-stand-gamescom-2025',
    title: 'Sonic Racing CrossWorlds Gamescom 2025 | 3D Case Study | Michael Ndhlovu',
    description: 'Technical 3D production for the Sonic Racing: CrossWorlds Gamescom 2025 stand, including UV work, texture correction, character cutouts and game item creation.',
    image: '/renders/sega/sonic-hero.webp',
    imageAlt: 'Sonic Racing CrossWorlds Gamescom 2025 stand case study by Michael Ndhlovu'
  },
  {
    path: '/work/genshin-impact-exhibition-booth',
    title: 'Genshin Impact Exhibition Booth | 3D Case Study | Michael Ndhlovu',
    description: 'Large-scale Genshin Impact exhibition booth design with character displays, audience areas, spatial planning and an environment shaped around the source visual identity.',
    image: '/renders/genshin-impact.webp',
    imageAlt: 'Genshin Impact exhibition booth 3D case study by Michael Ndhlovu'
  }
];

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function replaceMeta(html, attribute, key, value) {
  const pattern = new RegExp(`<meta\\s+${attribute}=["']${key}["'][^>]*>`, 'i');
  const replacement = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace('</head>', `    ${replacement}\n  </head>`);
}

function renderRouteHtml(template, route) {
  const canonical = new URL(route.path, ORIGIN).toString();
  const image = new URL(route.image, ORIGIN).toString();
  let html = template;

  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  html = replaceMeta(html, 'name', 'description', route.description);
  html = replaceMeta(html, 'property', 'og:title', route.title);
  html = replaceMeta(html, 'property', 'og:description', route.description);
  html = replaceMeta(html, 'property', 'og:url', canonical);
  html = replaceMeta(html, 'property', 'og:image', image);
  html = replaceMeta(html, 'property', 'og:image:alt', route.imageAlt);
  html = replaceMeta(html, 'name', 'twitter:title', route.title);
  html = replaceMeta(html, 'name', 'twitter:description', route.description);
  html = replaceMeta(html, 'name', 'twitter:image', image);
  html = replaceMeta(html, 'name', 'twitter:image:alt', route.imageAlt);
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${canonical}" />`
  );

  return html;
}

const template = await readFile(join(DIST, 'index.html'), 'utf8');

for (const route of routes) {
  const output = join(DIST, route.path.replace(/^\//, ''), 'index.html');
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, renderRouteHtml(template, route), 'utf8');
}

console.log(`Generated ${routes.length} route-specific SEO HTML shells.`);
