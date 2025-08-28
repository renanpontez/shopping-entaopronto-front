import type { StoreSchemaResponse } from '@/libs/sanity/types';
import { getBaseUrl } from './Helpers';

export const getOGTagsByStore = (store: StoreSchemaResponse) => {
  return {
    title: `${store.title} | Shopping EntãoPronto!`,
    description: `Conheça a ${store.title} - Uma das vitrines no Shopping EntãoPronto!`,
    images: [{ url: store.logo }],
    url: `${getBaseUrl()}/vitrine/${store.slug}`,
  };
};
