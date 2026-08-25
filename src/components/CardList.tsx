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
  return (
    <article className="glass-card glass-card--list">
      <div className="card-list">
        {items.map((item) => (
          <CardPanel key={item.id} content={item} />
        ))}
      </div>
    </article>
  );
}

export default CardList;
