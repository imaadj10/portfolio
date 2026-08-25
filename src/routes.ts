/**
 * Single source of truth mapping URL slugs to the `page_name` strings used
 * throughout SolarSystem/ContentPanel/contentRouting (e.g. `'about me'`).
 * Keeps deep links (SolarSystem, MobilePage) and in-scene navigation
 * (StellarObjectGeometry's click handler) resolving the same URLs.
 */
export const SLUG_TO_PAGE: Record<string, string> = {
  about: 'about me',
  projects: 'projects',
  experience: 'experience',
  contact: 'contact',
};

const PAGE_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_TO_PAGE).map(([slug, page]) => [page, slug])
);

export function slugFor(pageName: string): string | undefined {
  return PAGE_TO_SLUG[pageName];
}

export function pageForSlug(slug: string): string | undefined {
  return SLUG_TO_PAGE[slug];
}

/** Order drives both the desktop skip-nav and the mobile section list. */
export const SECTIONS: { slug: string; label: string }[] = [
  { slug: 'about', label: 'About' },
  { slug: 'experience', label: 'Experience' },
  { slug: 'projects', label: 'Projects' },
  { slug: 'contact', label: 'Contact' },
];
