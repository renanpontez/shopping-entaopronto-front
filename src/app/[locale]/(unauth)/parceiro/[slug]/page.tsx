import type { CategorySchema } from '@/libs/sanity/types';
import { sanityFetch } from '@/libs/sanity/live';
import { storeBySlugQuery } from '@/libs/sanity/queries';

type Params = {
  params: {
    slug: string;
  };
};

export default async function StorePage({ params }: Params) {
  const { slug } = params;

  const storeRes = await sanityFetch({
    query: storeBySlugQuery,
    params: { slug },
  }) as { data: CategorySchema };

  const store = storeRes?.data;

  if (!store) {
    return (
      <div>
        <h1>Nenhuma loja encontrada</h1>
        <p>A loja que você buscou parece não existir...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{store.title}</h1>
      {store.productsOrServices?.map(product => (
        <div key={product._key}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}
