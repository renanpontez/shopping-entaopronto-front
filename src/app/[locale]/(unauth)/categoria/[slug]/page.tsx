import type { CategorySchema } from '@/libs/sanity/types';
import { sanityFetch } from '@/libs/sanity/live';
import { categoriesQuery, storesQuery } from '@/libs/sanity/queries';

export default async function StoresByCategoryPage() {
  const categoriesRes = await sanityFetch({
    query: categoriesQuery,
  }) as { data: CategorySchema[] };

  const categories = categoriesRes?.data as CategorySchema[];

  const storeRes = await sanityFetch({
    query: storesQuery,
  }) as { data: CategorySchema[] };

  const stores = storeRes?.data as CategorySchema[];

  return (
    <>
      <h1>Stores By Category</h1>
      <div>
        <h4>Categorias</h4>
        {categories.map(category => (
          <div key={category._id}>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
          </div>
        ))}

        <hr />

        <h4>Lojas Cadastradas</h4>
        {stores.map(store => (
          <div key={store._id}>
            <h2>{store.title}</h2>
            <p>{store.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
