export type StoreSchemaResponse = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  productsOrServices: {
    _key: string;
    name: string;
    description: string;
    price: number;
    image: string;
    whatsappContact: number;
  }[];
  about: string;
  image: string;
  contact: {
    address: string;
    phone: string;
    email: string;
  };
};

export type CategorySchema = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  productsOrServices: {
    _key: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }[];
  about: string;
  image: string;
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  category: string;
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
