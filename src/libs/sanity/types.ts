import type { PortableTextBlock } from '@portabletext/types';

export type SEOSChema = {
  title: string;
  description: string;
  image: string;
  slug: string;
};

export type SiteSettingsSchema = {
  aboutUs: {
    image: string;
    description: PortableTextBlock;
  };
};

export type SubCategorySchema = {
  _id: string;
  title: string;
  image: string;
  description: string;
  seo: SEOSChema;
  icon: string;
};

export type CategorySchema = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  seo: SEOSChema;
  subCategories?: SubCategorySchema[];
  icon: string;
  storesCount: number;
  fiftyPlusStoresCount: number;
  impactEcossystemStoresCount: number;
  stores: StoreSchemaResponse[];
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
  _createdAt: string;
  title: string;
  slug: string;
  categories: CategorySchema[];
  solution: {
    _key: string;
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isFiftyPlus: boolean;
    isImpactEcossystem: boolean;
    whatsappContact: string;
  }[];
  about: PortableTextBlock;
  logo: string;
  aboutImage: string;
  contact: {
    address: string;
    phone: string;
    email: string;
    instagram: string;
  };
};
