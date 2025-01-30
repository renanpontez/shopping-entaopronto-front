import type { CategorySchema } from '@/libs/sanity/types';
import { sanityFetch } from '@/libs/sanity/live';
import { storesAndCategoriesQuery } from '@/libs/sanity/queries';

export default async function HomePage() {
  const response = await sanityFetch({
    query: storesAndCategoriesQuery,
  }) as { data: { stores: CategorySchema[]; categories: CategorySchema[] } };

  const { stores, categories } = response.data;

  return (
    <div>
      <div>
        <h1>Stores</h1>
        {stores.length
          ? (
              <div>Nenhuma loja encontrada...</div>
            )
          : (
              stores.map(store => (
                <div key={store._id} className="border-1 p-4">
                  <h1>{store.title}</h1>
                  {store.productsOrServices.length
                    ? (
                        <div>Nenhum produto disponível</div>
                      )
                    : (
                        store.productsOrServices.map(product => (
                          <div key={product._key}>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                          </div>
                        ))
                      )}
                </div>
              ))
            )}
      </div>

      <div className="mt-10">
        <h1>Categories</h1>
        {categories.length
          ? (
              <div>Nenhuma categoria encontrada...</div>
            )
          : (
              categories.map(category => (
                <div key={category._id}>
                  <h1>{category.title}</h1>
                </div>
              ))
            )}
      </div>
    </div>
  );
}
