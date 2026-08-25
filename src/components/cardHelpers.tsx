import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ReactNode } from 'react';
import { IconName } from '../data/content';

/** Shared by GlassCard and CardPanel so both resolve icons identically. */
export const ICONS: Record<IconName, ReactNode> = {
  github: <GitHubIcon fontSize="small" />,
  linkedin: <LinkedInIcon fontSize="small" />,
  email: <EmailIcon fontSize="small" />,
};

/**
 * Deterministic hue for a tag pill, kept inside the cyan-to-violet band
 * (190-285) so the stack list reads as varied without ever leaving the
 * site's palette. Same input always yields the same colour.
 */
export function tagHue(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % 96;
  }
  return 190 + hash;
}
