'use server';

import type { StoreSchemaResponse } from '@/libs/sanity/types';
import { searchStores } from '@/libs/sanity/fetcher';

export async function searchStoresAction(query: string): Promise<StoreSchemaResponse[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const stores = await searchStores(query);
    return stores;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}
