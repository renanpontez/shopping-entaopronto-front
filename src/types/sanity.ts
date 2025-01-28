type ProductsOrServices = {
  whatsappContact: number;
  image: string;
  price: number;
  _type: string;
  name: string;
  description: string;
  isProduct: boolean;
  _key: string;
};

type Category = {
  _ref: string;
  _type: string;
};

export type SanityStoresRespose = {
  title: string;
  productsOrServices: ProductsOrServices[];
  category: Category;
  _createdAt: string;
  _type: string;
  _id: string;
  _updatedAt: string;
  _rev: string;
};

type Slug = {
  current: string;
  _type: string;
};

type SEO = {
  _type: 'seo';
  title: string;
  description: string;
  keywords: string[];
  image: string;
};

export type SanityCategoriesResponse = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _type: string;
  title: string;
  description: string;
  slug: Slug;
  seo: SEO;
};
