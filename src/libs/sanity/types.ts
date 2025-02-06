export type SEOSChema = {
  title: string;
  description: string;
  image: string;
  slug: string;
};

export type SubCategorySchema = {
  _id: string;
  title: string;
  image: string;
};

export type CategorySchema = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  seo: SEOSChema;
  subCategories: SubCategorySchema[];
  icon: { svg: string };
};

export type Link = {
  _type: 'link';
  linkType?: 'href' | 'page' | 'post';
  href?: string;
  page?: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
  };
  post?: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
  };
  openInNewTab?: boolean;
};

export type StoreSchemaResponse = {
  _id: string;
  title: string;
  slug: string;
  category: CategorySchema;
  productsOrServices: {
    _key: string;
    name: string;
    description: string;
    price: number;
    image: string;
    whatsappContact: string;
  }[];
  about: string;
  image: string;
  contact: {
    address: string;
    phone: string;
    email: string;
    instagram: string;
  };
};
