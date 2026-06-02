import type { NavLinkSchema } from '@/libs/sanity/types';

export type ResolvedNavLink = {
  key: string;
  label: string;
  href: string;
  isExternal: boolean;
  openInNewTab: boolean;
};

export const FALLBACK_NAV_LINKS: ResolvedNavLink[] = [
  { key: 'fallback-inicio', label: 'Início', href: '/', isExternal: false, openInNewTab: false },
  { key: 'fallback-categorias', label: 'Categorias', href: '/categorias', isExternal: false, openInNewTab: false },
  { key: 'fallback-vitrines', label: 'Vitrines', href: '/vitrines', isExternal: false, openInNewTab: false },
  { key: 'fallback-contato', label: 'Contato', href: '/contato', isExternal: false, openInNewTab: false },
];

export const resolveNavLinks = (navigation?: NavLinkSchema[] | null): ResolvedNavLink[] => {
  if (!navigation || navigation.length === 0) {
    return FALLBACK_NAV_LINKS;
  }

  return navigation
    .map((link, index): ResolvedNavLink | null => {
      const isExternal = link.linkType === 'external';
      const href = isExternal ? link.externalHref : link.internalHref;

      if (!link.label || !href) {
        return null;
      }

      return {
        key: link._key ?? `nav-${index}`,
        label: link.label,
        href,
        isExternal,
        openInNewTab: Boolean(link.openInNewTab),
      };
    })
    .filter((link): link is ResolvedNavLink => link !== null);
};
