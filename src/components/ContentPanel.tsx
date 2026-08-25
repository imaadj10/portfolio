import { ReactNode, useEffect, useState } from 'react';
import '../css/GlassCard.css';
import content from '../data/content';
import CardCarousel from './CardCarousel';
import GlassCard from './GlassCard';

/**
 * How long after a planet is selected the card materializes. Tuned to
 * land just as the camera finishes easing onto the planet, so the glitch
 * reads as the card arriving rather than as it fighting the flight.
 */
const ENTER_DELAY = 1400;

/**
 * Must match --glitch-out in GlassCard.css. Exported so SolarSystem can
 * hold the camera in place until the glitch finishes before flying home.
 */
export const EXIT_DURATION = 320;

function cardFor(page: string): ReactNode {
  switch (page) {
    case 'about me':
      return <GlassCard content={content.about} />;
    case 'projects':
      return <CardCarousel items={content.projects} />;
    case 'experience':
      return <CardCarousel items={content.experience} />;
    case 'contact':
      return <GlassCard content={content.contact} />;
    default:
      return null;
  }
}

interface ContentPanelProps {
  page: string;
  /** True once the camera has locked onto a planet (i.e. orbits paused). */
  active: boolean;
}

/**
 * Owns where cards live on screen and when they appear. Every section
 * renders into the same fixed box, which is what keeps placement
 * identical from page to page.
 */
function ContentPanel({ page, active }: ContentPanelProps) {
  const [phase, setPhase] = useState<'hidden' | 'enter' | 'exit'>('hidden');
  // Held separately from `page` so the card still has content to render
  // while it glitches out after the page has already flipped to 'home'.
  const [shownPage, setShownPage] = useState(page);

  useEffect(() => {
    if (page !== 'home') setShownPage(page);
  }, [page]);

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setPhase('enter'), ENTER_DELAY);
      return () => clearTimeout(timer);
    }
    setPhase((current) => (current === 'enter' ? 'exit' : 'hidden'));
  }, [active]);

  useEffect(() => {
    if (phase !== 'exit') return;
    const timer = setTimeout(() => setPhase('hidden'), EXIT_DURATION);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === 'hidden') return null;

  return (
    <div className="content-panel" data-phase={phase}>
      {cardFor(shownPage)}
    </div>
  );
}

export default ContentPanel;
