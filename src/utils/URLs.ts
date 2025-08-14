export const buildCategoryUrl = (slug: string) => `/categoria/${slug}`;
export const buildStoreUrl = (slug: string) => `/vitrine/${slug}`;

export const MENU_LINKS_MOCK = [
  { label: 'Início', href: '/' },
  { label: 'Categorias', href: '/categorias' },
  { label: 'Vitrines', href: '/vitrines' },
  { label: 'Contato', href: '/contato' },
];
