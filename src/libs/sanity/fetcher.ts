import type { CategorySchema, SiteSettingsSchema, StoreSchemaResponse } from './types';
import { client } from './client';
import { sanityFetch } from './live';
import { categoriesQuery, categoryBySlugQuery, searchStoresQueryParams, siteSettingsQuery, storeBySlugQuery, storesByCategoryIdQuery, storesQuery, storesQueryWithFiftyPlus } from './queries';

// Store

export const getAllStores = async (): Promise<StoreSchemaResponse[]> => {
  const storeRes = await sanityFetch({
    query: storesQuery,
    tag: 'store',
  }) as { data: StoreSchemaResponse[] };
  const stores = storeRes?.data as StoreSchemaResponse[] ?? [];

  return stores;
};

export const searchStores = async (query: string): Promise<StoreSchemaResponse[]> => {
  const stores = await client.fetch(searchStoresQueryParams(query));
  return stores || [];
};

export const getStoresByCategoryId = async (categoryId: string): Promise<StoreSchemaResponse[]> => {
  const storesRes = await sanityFetch({
    query: storesByCategoryIdQuery,
    params: { categoryId },
    tag: 'store',
  }) as { data: StoreSchemaResponse[] };
  const stores = storesRes?.data as StoreSchemaResponse[] ?? [];
  return stores;
};

export const getStoreBySlug = async (slug: string): Promise<StoreSchemaResponse> => {
  const storeRes = await sanityFetch({
    query: storeBySlugQuery,
    params: { slug },
    tag: `store`,
  }) as { data: StoreSchemaResponse };
  const store = storeRes?.data as StoreSchemaResponse;

  return store;
};

export const get50PlusStores = async (): Promise<StoreSchemaResponse[]> => {
  const storesRes = await sanityFetch({
    query: storesQueryWithFiftyPlus,
    tag: 'store',
  }) as { data: StoreSchemaResponse[] };
  const stores = storesRes?.data as StoreSchemaResponse[] ?? [];

  return stores;
};

// Category

export const getAllCategories = async (): Promise<CategorySchema[]> => {
  const categoriesRes = await sanityFetch({
    query: categoriesQuery,
    tag: 'category',
  }) as { data: CategorySchema[] };
  const categories = categoriesRes?.data as CategorySchema[] ?? [];

  return categories;
};

export const getCategoryBySlug = async (slug: string): Promise<CategorySchema> => {
  const categoryRes = await sanityFetch({
    query: categoryBySlugQuery,
    params: { slug },
    tag: `category`,
  }) as { data: CategorySchema };
  const category = categoryRes?.data as CategorySchema;

  return category;
};

// Site Settings

export const getSiteSettings = async (): Promise<SiteSettingsSchema> => {
  const settingsRes = await sanityFetch({
    query: siteSettingsQuery,
    tag: 'siteSettings',
  }) as { data: SiteSettingsSchema };
  const settings = settingsRes?.data as SiteSettingsSchema;

  return settings;
};
