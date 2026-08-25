import '../css/GlassCard.css';
import { CardContent } from '../data/content';
import { ICONS, tagHue } from './cardHelpers';

interface CardPanelProps {
  content: CardContent;
}

/**
 * One entry inside the Projects/Experience card. Deliberately plainer
 * than GlassCard — no gradient border, spotlight, or glow — since these
 * sit *inside* a glass card and repeating that treatment per entry would
 * read as a pile of cards rather than one panelled page.
 *
 * Every panel is the same fixed height (see .card-panel in GlassCard.css)
 * regardless of how much copy it carries, so the column stays even.
 */
function CardPanel({ content }: CardPanelProps) {
  const { title, subtitle, badge, media, body, action, tags } = content;

  return (
    <section className="card-panel">
      {media && (
        <div
          className="card-panel__media"
          style={{ ['--media-bg' as string]: media.background }}
        >
          <img src={media.src} alt={media.alt} />
        </div>
      )}

      <div className="card-panel__content">
        <header className="card-panel__header">
          <div className="card-panel__heading">
            <div className="card-panel__title-row">
              <h3 className="card-panel__title">{title}</h3>
              {badge && <span className="card-panel__badge">{badge}</span>}
            </div>
            {subtitle && <p className="card-panel__subtitle">{subtitle}</p>}
          </div>

          {action && (
            <a
              className="card-panel__action"
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {action.label}
              {action.icon && ICONS[action.icon]}
            </a>
          )}
        </header>

        <div className="card-panel__body">
          {body?.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        {tags && (
          <footer className="card-panel__tags">
            <span className="card-panel__tags-label">{tags.label}</span>
            <div className="card-panel__tag-list">
              {tags.items.map((item) => (
                <span
                  className="card-panel__tag"
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
    </section>
  );
}

export default CardPanel;
