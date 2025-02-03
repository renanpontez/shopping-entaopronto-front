import type { StoreSchemaResponse } from '@/libs/sanity/types';
import { sanityFetch } from '@/libs/sanity/live';
import { storeBySlugQuery } from '@/libs/sanity/queries';

export default async function StorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const storeRes = await sanityFetch({
    query: storeBySlugQuery,
    params: { slug },
  }) as { data: StoreSchemaResponse };

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
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}
