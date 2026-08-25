import { ReactNode } from 'react';
import content from '../data/content';
import CardList from './CardList';
import GlassCard from './GlassCard';

/**
 * How big the panel gets, per section — the one thing that isn't shared
 * across pages, since a scrolling list of projects and a three-link
 * contact card want very different amounts of the screen. Read by
 * GlassCard.css off `data-layout`.
 */
export function layoutFor(page: string): string {
  switch (page) {
    case 'projects':
    case 'experience':
      return 'list';
    case 'about me':
      return 'split';
    default:
      return 'compact';
  }
}

export function cardFor(page: string): ReactNode {
  switch (page) {
    case 'about me':
      return <GlassCard content={content.about} variant="split" />;
    case 'projects':
      return <CardList items={content.projects} />;
    case 'experience':
      return <CardList items={content.experience} />;
    case 'contact':
      return <GlassCard content={content.contact} variant="compact" />;
    default:
      return null;
  }
}
