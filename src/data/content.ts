import raw from './content.json';

/**
 * Every card on the site is a variation of the same shape, so a single
 * schema covers all four sections. Optional fields simply omit their
 * section: About has no `media`, Contact has no `body`, and so on.
 */
export type IconName = 'github' | 'linkedin' | 'email';

export interface CardMedia {
  src: string;
  alt: string;
  /** Backdrop behind the (contained) screenshot, usually the app's own bg. */
  background: string;
}

export interface CardAction {
  label: string;
  href: string;
  icon?: IconName;
}

export interface CardTags {
  label: string;
  items: string[];
}

export interface CardLink {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: IconName;
}

export interface CardContent {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  avatar?: string;
  media?: CardMedia;
  body?: string[];
  action?: CardAction;
  tags?: CardTags;
  links?: CardLink[];
}

export interface SiteContent {
  about: CardContent;
  contact: CardContent;
  projects: CardContent[];
  experience: CardContent[];
}

const content = raw as SiteContent;

export default content;
