import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/App.css';
import '../css/GlassCard.css';
import '../css/MobilePage.css';
import { pageForSlug, SECTIONS } from '../routes';
import { cardFor, layoutFor } from './contentRouting';

/**
 * The phone/tablet entry point. A plain
 * scrolling page rather than an overlay on the 3D scene — orbits, camera
 * flight, and the glitch choreography in ContentPanel all assume a canvas
 * and a mouse-driven click-to-focus interaction that doesn't translate to
 * touch, so this reuses only the content layer (`cardFor`/`layoutFor`,
 * the same GlassCard/CardList/CardPanel components) and none of that.
 */
function MobilePage() {
  const location = useLocation();

  // Deep link support: opening /projects directly on a narrow viewport
  // scrolls straight to that section instead of landing at the top.
  useEffect(() => {
    const slug = location.pathname.replace(/^\//, '');
    if (!pageForSlug(slug)) return;
    document.getElementById(slug)?.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nav links scroll to the section by hand instead of navigating, so the
  // URL stays put on mobile (unlike the desktop deep links).
  const handleNavClick =
    (slug: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <div className="content-container mobile-page">
      <nav className="mobile-nav">
        {SECTIONS.map(({ slug, label }) => (
          <a key={slug} href={`/${slug}`} onClick={handleNavClick(slug)}>
            {label}
          </a>
        ))}
      </nav>

      <header className="mobile-hero">
        <h1>Imaad Junaidi</h1>
        <p>Portfolio</p>
      </header>

      {SECTIONS.map(({ slug, label }) => {
        const page = pageForSlug(slug) as string;
        return (
          <section
            key={slug}
            id={slug}
            className="mobile-section"
            data-layout={layoutFor(page)}
          >
            <h2 className="mobile-section__label">{label}</h2>
            {cardFor(page)}
          </section>
        );
      })}
    </div>
  );
}

export default MobilePage;
