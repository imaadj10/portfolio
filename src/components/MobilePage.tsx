import '../css/App.css';
import '../css/GlassCard.css';
import '../css/MobilePage.css';
import { cardFor, layoutFor } from './contentRouting';

const SECTIONS: { id: string; label: string; page: string }[] = [
  { id: 'about', label: 'About', page: 'about me' },
  { id: 'experience', label: 'Experience', page: 'experience' },
  { id: 'projects', label: 'Projects', page: 'projects' },
  { id: 'contact', label: 'Contact', page: 'contact' },
];

/**
 * The phone/tablet entry point (see App.tsx's `isMobile` branch). A plain
 * scrolling page rather than an overlay on the 3D scene — orbits, camera
 * flight, and the glitch choreography in ContentPanel all assume a canvas
 * and a mouse-driven click-to-focus interaction that doesn't translate to
 * touch, so this reuses only the content layer (`cardFor`/`layoutFor`,
 * the same GlassCard/CardList/CardPanel components) and none of that.
 */
function MobilePage() {
  return (
    <div className="content-container mobile-page">
      <nav className="mobile-nav">
        {SECTIONS.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.label}
          </a>
        ))}
      </nav>

      <header className="mobile-hero">
        <h1>Imaad Junaidi</h1>
        <p>Portfolio</p>
      </header>

      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mobile-section"
          data-layout={layoutFor(section.page)}
        >
          <h2 className="mobile-section__label">{section.label}</h2>
          {cardFor(section.page)}
        </section>
      ))}
    </div>
  );
}

export default MobilePage;
