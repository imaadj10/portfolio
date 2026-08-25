import { useCallback, useRef } from 'react';
import '../css/GlassCard.css';
import { CardContent } from '../data/content';
import { ICONS, tagHue } from './cardHelpers';

/**
 * Which shape the card takes. The markup is identical across both — an
 * optional image pane followed by a content column — so the variant only
 * ever changes CSS, never which slots render.
 *
 * - `split`   About: portrait filling the full left edge, copy right.
 * - `compact` Contact: no image, sized to its own contents.
 *
 * Projects and Experience don't use GlassCard directly; they render one
 * `glass-card--list` shell full of CardPanels — see CardList.tsx.
 */
export type CardVariant = 'split' | 'compact';

interface GlassCardProps {
  content: CardContent;
  variant?: CardVariant;
}

/**
 * The single card used by every section. Which slots render is driven
 * entirely by which fields the content object carries, so adding a
 * project or reordering copy never means touching styling.
 */
function GlassCard({ content, variant = 'compact' }: GlassCardProps) {
  const { title, subtitle, badge, avatar, media, body, action, tags, links } =
    content;
  const cardRef = useRef<HTMLElement>(null);

  // Feeds the cursor-tracked spotlight in GlassCard.css. Written straight
  // to the node rather than through state so it never triggers a render.
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
      className={`glass-card glass-card--${variant}`}
      onPointerMove={handlePointerMove}
    >
      {media && (
        <div
          className="glass-card__media"
          style={{ ['--media-bg' as string]: media.background }}
        >
          <img src={media.src} alt={media.alt} />
        </div>
      )}

      {avatar && (
        <div className="glass-card__portrait">
          <img src={avatar} alt={title} />
        </div>
      )}

      <div className="glass-card__content">
        <header className="glass-card__header">
          <div className="glass-card__heading">
            <div className="glass-card__title-row">
              <h2 className="glass-card__title">{title}</h2>
              {badge && <span className="glass-card__badge">{badge}</span>}
            </div>
            {subtitle && <p className="glass-card__subtitle">{subtitle}</p>}
          </div>

          {action && (
            <a
              className="glass-card__action"
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {action.label}
              {action.icon && ICONS[action.icon]}
            </a>
          )}
        </header>

        <div
          className={`glass-card__body${
            links ? ' glass-card__body--links' : ''
          }`}
        >
          {body?.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}

          {links && (
            <ul className="glass-card__links">
              {links.map((link) => (
                <li className="glass-card__link" key={link.id}>
                  <span className="glass-card__link-label">{link.label}</span>
                  <a
                    className="glass-card__action"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ICONS[link.icon]}
                    {link.value}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {tags && (
          <footer className="glass-card__tags">
            <span className="glass-card__tags-label">{tags.label}</span>
            <div className="glass-card__tag-list">
              {tags.items.map((item) => (
                <span
                  className="glass-card__tag"
                  key={item}
                  style={{ ['--tag-hue' as string]: String(tagHue(item)) }}
                >
                  {item}
                </span>
              ))}
            </div>
          </footer>
        )}
      </div>
    </article>
  );
}

export default GlassCard;
