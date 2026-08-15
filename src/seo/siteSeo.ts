import { projects, services, type PortfolioProject } from '../data/portfolioContent';

export type Page = 'home' | 'projects' | 'services' | 'about' | 'contact' | 'case-study';

export interface RouteState {
  page: Page;
  projectId: string | null;
}

export const SITE_ORIGIN = 'https://michaelndhlovu.vercel.app';
export const SITE_NAME = 'Michael Ndhlovu Portfolio';
export const DEFAULT_SOCIAL_IMAGE = '/renders/netflix/netflix-hero.webp';

const PAGE_PATHS: Record<Exclude<Page, 'case-study'>, string> = {
  home: '/',
  projects: '/work',
  services: '/services',
  about: '/about',
  contact: '/contact'
};

const PAGE_META: Record<Exclude<Page, 'case-study'>, { title: string; description: string }> = {
  home: {
    title: 'Michael Ndhlovu | Software Developer, 3D Generalist & VR Designer',
    description: 'Portfolio of Michael Ndhlovu, also known as Mikey Nu, a South African software developer, 3D generalist and VR designer creating digital products, 3D experiences and immersive solutions.'
  },
  projects: {
    title: 'Selected Work | Michael Ndhlovu 3D & Digital Portfolio',
    description: 'Selected production work by Michael Ndhlovu across 3D design, visualization, branded environments and interactive digital experiences for Netflix, SEGA, Mercedes-Benz and other brands.'
  },
  services: {
    title: 'Software Development, 3D Design & VR Solutions | Michael Ndhlovu',
    description: 'Software development, web and app development, 3D design and visualization, and VR solutions by Michael Ndhlovu for products, platforms, brands and immersive experiences.'
  },
  about: {
    title: 'About Michael Ndhlovu | Software, 3D & VR',
    description: 'Learn about Michael Ndhlovu, a South African software developer, senior 3D generalist and immersive experience designer working across software, 3D production and VR.'
  },
  contact: {
    title: 'Contact Michael Ndhlovu | Software, 3D & VR Projects',
    description: 'Contact Michael Ndhlovu to discuss software development, web or app development, 3D design and visualization, VR solutions, or multidisciplinary digital experience work.'
  }
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

export function getProjectPath(project: PortfolioProject) {
  return `/work/${slugify(project.title)}`;
}

export function getProjectByPath(pathname: string) {
  const normalized = normalizePath(pathname);
  return projects.find((project) => getProjectPath(project) === normalized && project.caseStudy) ?? null;
}

export function getPagePath(page: Page, projectId: string | null = null) {
  if (page === 'case-study' && projectId) {
    const project = projects.find((item) => item.id === projectId && item.caseStudy);
    if (project) return getProjectPath(project);
  }

  if (page === 'case-study') return PAGE_PATHS.projects;
  return PAGE_PATHS[page];
}

function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') return '/';
  return `/${pathname.replace(/^\/+|\/+$/g, '')}`;
}

function routeFromHash(hash: string): RouteState | null {
  const raw = hash.replace(/^#\/?/, '');
  if (!raw || raw === 'home') return { page: 'home', projectId: null };
  if (raw === 'projects') return { page: 'projects', projectId: null };
  if (raw === 'services') return { page: 'services', projectId: null };
  if (raw === 'about') return { page: 'about', projectId: null };
  if (raw === 'contact') return { page: 'contact', projectId: null };
  if (raw.startsWith('case-study/')) {
    const projectId = raw.slice('case-study/'.length) || null;
    if (projectId && projects.some((project) => project.id === projectId && project.caseStudy)) {
      return { page: 'case-study', projectId };
    }
  }
  return null;
}

export function parseRoute(location: Pick<Location, 'pathname' | 'hash'> = window.location): RouteState {
  const pathname = normalizePath(location.pathname);

  if (pathname === '/' && location.hash) {
    const legacyRoute = routeFromHash(location.hash);
    if (legacyRoute) return legacyRoute;
  }

  if (pathname === '/') return { page: 'home', projectId: null };
  if (pathname === '/work') return { page: 'projects', projectId: null };
  if (pathname === '/services') return { page: 'services', projectId: null };
  if (pathname === '/about') return { page: 'about', projectId: null };
  if (pathname === '/contact') return { page: 'contact', projectId: null };

  const project = getProjectByPath(pathname);
  if (project) return { page: 'case-study', projectId: project.id };

  return { page: 'home', projectId: null };
}

function absoluteUrl(path: string) {
  return new URL(path, SITE_ORIGIN).toString();
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element!.setAttribute(key, value));
}

function upsertCanonical(url: string) {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

function setStructuredData(data: unknown) {
  let script = document.head.querySelector<HTMLScriptElement>('#route-structured-data');
  if (!script) {
    script = document.createElement('script');
    script.id = 'route-structured-data';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function personEntity() {
  return {
    '@type': 'Person',
    '@id': `${SITE_ORIGIN}/about#person`,
    name: 'Michael Ndhlovu',
    alternateName: 'Mikey Nu',
    url: `${SITE_ORIGIN}/about`,
    email: 'mailto:info@mikeynu.com',
    jobTitle: 'Software Developer, 3D Generalist and VR Designer',
    knowsAbout: [
      'Software development',
      'Web development',
      'Mobile application development',
      '3D modeling',
      '3D visualization',
      'Virtual reality',
      'XR',
      'Blender',
      'Unreal Engine',
      'Unity',
      'Three.js'
    ],
    sameAs: [
      'https://mikeynu.artstation.com/',
      'https://www.cgtrader.com/designers/mikey-nu'
    ]
  };
}

function pageStructuredData(page: Page, project: PortfolioProject | null, canonicalUrl: string) {
  const person = personEntity();

  if (page === 'about') {
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': canonicalUrl,
      url: canonicalUrl,
      name: PAGE_META.about.title,
      mainEntity: person
    };
  }

  if (page === 'services') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        person,
        {
          '@type': 'WebPage',
          '@id': canonicalUrl,
          url: canonicalUrl,
          name: PAGE_META.services.title,
          description: PAGE_META.services.description,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: services.map((service, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Service',
                name: service.title,
                description: service.description,
                provider: { '@id': person['@id'] }
              }
            }))
          }
        }
      ]
    };
  }

  if (page === 'projects') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        person,
        {
          '@type': 'CollectionPage',
          '@id': canonicalUrl,
          url: canonicalUrl,
          name: PAGE_META.projects.title,
          description: PAGE_META.projects.description,
          hasPart: projects
            .filter((item) => item.caseStudy)
            .map((item) => ({
              '@type': 'CreativeWork',
              name: item.title,
              url: absoluteUrl(getProjectPath(item)),
              image: absoluteUrl(item.image),
              creator: { '@id': person['@id'] }
            }))
        }
      ]
    };
  }

  if (page === 'case-study' && project?.caseStudy) {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        person,
        {
          '@type': 'CreativeWork',
          '@id': canonicalUrl,
          url: canonicalUrl,
          name: project.title,
          description: project.caseStudy.overview,
          image: project.caseStudy.gallery.map(absoluteUrl),
          dateCreated: project.year,
          creator: { '@id': person['@id'] },
          keywords: project.tags.join(', ')
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
            { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_ORIGIN}/work` },
            { '@type': 'ListItem', position: 3, name: project.title, item: canonicalUrl }
          ]
        }
      ]
    };
  }

  if (page === 'contact') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        person,
        {
          '@type': 'ContactPage',
          '@id': canonicalUrl,
          url: canonicalUrl,
          name: PAGE_META.contact.title,
          description: PAGE_META.contact.description,
          mainEntity: { '@id': person['@id'] }
        }
      ]
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        url: SITE_ORIGIN,
        name: SITE_NAME,
        alternateName: 'Mikey Nu Portfolio',
        description: PAGE_META.home.description,
        inLanguage: 'en-ZA'
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl,
        url: canonicalUrl,
        name: PAGE_META.home.title,
        description: PAGE_META.home.description,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        about: { '@id': person['@id'] }
      }
    ]
  };
}

export function syncSeo(page: Page, projectId: string | null) {
  const project = page === 'case-study'
    ? projects.find((item) => item.id === projectId && item.caseStudy) ?? null
    : null;

  const path = getPagePath(page, projectId);
  const canonicalUrl = absoluteUrl(path);
  const pageMeta = page === 'case-study' && project?.caseStudy
    ? {
        title: `${project.title} | 3D Case Study | Michael Ndhlovu`,
        description: project.caseStudy.overview
      }
    : PAGE_META[page === 'case-study' ? 'projects' : page];
  const imagePath = project?.image ?? DEFAULT_SOCIAL_IMAGE;
  const imageUrl = absoluteUrl(imagePath);
  const imageAlt = project ? `${project.title} project render` : 'Michael Ndhlovu selected 3D and digital portfolio work';

  document.documentElement.lang = 'en-ZA';
  document.title = pageMeta.title;

  upsertCanonical(canonicalUrl);
  upsertMeta('meta[name="description"]', { name: 'description', content: pageMeta.description });
  upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' });
  upsertMeta('meta[name="googlebot"]', { name: 'googlebot', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' });
  upsertMeta('meta[name="author"]', { name: 'author', content: 'Michael Ndhlovu' });

  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: pageMeta.title });
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: pageMeta.description });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: page === 'about' ? 'profile' : 'website' });
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
  upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_ZA' });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
  upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: imageAlt });

  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: pageMeta.title });
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: pageMeta.description });
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });
  upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: imageAlt });

  setStructuredData(pageStructuredData(page, project, canonicalUrl));
}
