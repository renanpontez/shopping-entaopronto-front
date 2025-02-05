export const buildCategoryUrl = (slug: string) => `/categoria/${slug}`;
export const buildStoreUrl = (slug: string) => `/parceiro/${slug}`;

export const MENU_LINKS_MOCK = [
  { label: 'Início', href: '/' },
  { label: 'Categorias', href: '/categorias' },
  { label: 'Parceiros', href: '/parceiros' },
  { label: 'Contato', href: '/contato' },
];
