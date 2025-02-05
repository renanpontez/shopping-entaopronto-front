import type { StoreSchemaResponse } from '@/libs/sanity/types';
import { sanityFetch } from '@/libs/sanity/live';
import { storesQuery } from '@/libs/sanity/queries';

export default async function StoresPage() {
  const storesRes = await sanityFetch({
    query: storesQuery,
  }) as { data: StoreSchemaResponse[] };

  const stores = storesRes?.data as StoreSchemaResponse[];

  if (!stores || stores.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Lojas</h1>
        <div>Nenhuma loja encontrada...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Lojas</h1>
      <div className="flex gap-4">
        {stores.map(store => (
          <div key={store._id} className="border-2 border-gray-500 p-4">
            <h2>{store.title}</h2>
            <p>
              {store.productsOrServices?.map(product => (
                <div key={product._key}>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                </div>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
