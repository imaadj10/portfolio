import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useCallback, useEffect, useState } from 'react';
import '../css/GlassCard.css';
import { CardContent } from '../data/content';
import GlassCard from './GlassCard';

interface CardCarouselProps {
  items: CardContent[];
}

/**
 * Only the active card is mounted, which means every slide change
 * remounts the card and replays its glitch-in animation. Wraps around
 * at both ends, and responds to the left/right arrow keys.
 */
function CardCarousel({ items }: CardCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = items.length;

  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [step]);

  const active = items[index];

  return (
    <div className="card-carousel">
      <div className="card-carousel__viewport">
        <GlassCard key={active.id} content={active} />
      </div>

      <button
        type="button"
        aria-label="Previous"
        className="card-carousel__arrow card-carousel__arrow--prev"
        onClick={() => step(-1)}
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        aria-label="Next"
        className="card-carousel__arrow card-carousel__arrow--next"
        onClick={() => step(1)}
      >
        <ChevronRightIcon />
      </button>

      <div className="card-carousel__dots">
        {items.map((item, i) => (
          <button
            type="button"
            key={item.id}
            aria-label={item.title}
            className="card-carousel__dot"
            data-active={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default CardCarousel;
