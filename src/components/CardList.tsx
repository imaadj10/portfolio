import { useCallback, useRef } from 'react';
import '../css/GlassCard.css';
import { CardContent } from '../data/content';
import CardPanel from './CardPanel';

interface CardListProps {
  items: CardContent[];
}

/**
 * Projects and Experience are a single card holding every entry as a
 * panel, scrolling internally — rather than paging through one entry at
 * a time as the old carousel did.
 */
function CardList({ items }: CardListProps) {
  const cardRef = useRef<HTMLElement>(null);

  // Feeds the cursor-tracked spotlight in GlassCard.css — mirrors
  // GlassCard.tsx's handler since this card renders its own shell
  // rather than going through that component.
  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    },
    []
  );

  return (
    <article
      ref={cardRef}
      className="glass-card glass-card--list"
      onPointerMove={handlePointerMove}
    >
      <div className="card-list">
        {items.map((item) => (
          <CardPanel key={item.id} content={item} />
        ))}
      </div>
    </article>
  );
}

export default CardList;
