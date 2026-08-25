import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ReactNode, useCallback, useRef } from 'react';
import '../css/GlassCard.css';
import { CardContent, IconName } from '../data/content';

const ICONS: Record<IconName, ReactNode> = {
  github: <GitHubIcon fontSize="small" />,
  linkedin: <LinkedInIcon fontSize="small" />,
  email: <EmailIcon fontSize="small" />,
};

/**
 * Deterministic hue for a tag pill, kept inside the cyan-to-violet band
 * (190-285) so the stack list reads as varied without ever leaving the
 * site's palette. Same input always yields the same colour.
 */
function tagHue(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % 96;
  }
  return 190 + hash;
}

interface GlassCardProps {
  content: CardContent;
}

/**
 * The single card used by every section. Which slots render is driven
 * entirely by which fields the content object carries, so adding a
 * project or reordering copy never means touching styling.
 */
function GlassCard({ content }: GlassCardProps) {
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
      className={`glass-card${avatar ? ' glass-card--portrait' : ''}`}
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

      <header className="glass-card__header">
        <div className="glass-card__heading">
          <div className="glass-card__title-row">
            <h2 className="glass-card__title">{title}</h2>
            {badge && <span className="glass-card__badge">{badge}</span>}
          </div>
          {subtitle && <p className="glass-card__subtitle">{subtitle}</p>}
        </div>

        {avatar && (
          <img className="glass-card__avatar" src={avatar} alt={title} />
        )}

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
        className={`glass-card__body${links ? ' glass-card__body--links' : ''}`}
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
    </article>
  );
}

export default GlassCard;
