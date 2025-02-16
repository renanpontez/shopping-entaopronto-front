import type { CategorySchema, SiteSettingsSchema, StoreSchemaResponse } from './types';
import { sanityFetch } from './live';
import { categoriesQuery, siteSettingsQuery, storesQuery } from './queries';

export const getAllStores = async (): Promise<StoreSchemaResponse[]> => {
  const storeRes = await sanityFetch({
    query: storesQuery,
  }) as { data: StoreSchemaResponse[] };
  const stores = storeRes?.data as StoreSchemaResponse[] ?? [];

  return stores;
};

export const getAllCategories = async (): Promise<CategorySchema[]> => {
  const categoriesRes = await sanityFetch({
    query: categoriesQuery,
  }) as { data: CategorySchema[] };
  const categories = categoriesRes?.data as CategorySchema[] ?? [];

  return categories;
};

export const getSiteSettings = async (): Promise<SiteSettingsSchema> => {
  const settingsRes = await sanityFetch({
    query: siteSettingsQuery,
  }) as { data: SiteSettingsSchema };
  const settings = settingsRes?.data as SiteSettingsSchema;

  return settings;
};
