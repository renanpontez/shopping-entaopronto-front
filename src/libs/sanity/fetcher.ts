import type { CategorySchema, SiteSettingsSchema, StoreSchemaResponse } from './types';
import { sanityFetch } from './live';
import { categoriesQuery, categoryBySlugQuery, siteSettingsQuery, storesByCategoryIdQuery, storesQuery } from './queries';

// Store

export const getAllStores = async (): Promise<StoreSchemaResponse[]> => {
  const storeRes = await sanityFetch({
    query: storesQuery,
  }) as { data: StoreSchemaResponse[] };
  const stores = storeRes?.data as StoreSchemaResponse[] ?? [];

  return stores;
};

export const getStoresByCategoryId = async (categoryId: string): Promise<StoreSchemaResponse[]> => {
  const storesRes = await sanityFetch({
    query: storesByCategoryIdQuery,
    params: { categoryId },
  }) as { data: StoreSchemaResponse[] };
  const stores = storesRes?.data as StoreSchemaResponse[] ?? [];
  return stores;
};

// Category

export const getAllCategories = async (): Promise<CategorySchema[]> => {
  const categoriesRes = await sanityFetch({
    query: categoriesQuery,
  }) as { data: CategorySchema[] };
  const categories = categoriesRes?.data as CategorySchema[] ?? [];

  return categories;
};

export const getCategoryBySlug = async (slug: string): Promise<CategorySchema> => {
  const categoryRes = await sanityFetch({
    query: categoryBySlugQuery,
    params: { slug },
  }) as { data: CategorySchema };
  const category = categoryRes?.data as CategorySchema;

  return category;
};

// Site Settings

export const getSiteSettings = async (): Promise<SiteSettingsSchema> => {
  const settingsRes = await sanityFetch({
    query: siteSettingsQuery,
  }) as { data: SiteSettingsSchema };
  const settings = settingsRes?.data as SiteSettingsSchema;

  return settings;
};
