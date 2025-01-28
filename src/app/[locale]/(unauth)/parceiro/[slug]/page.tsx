'use client';
import type { SanityStoresRespose } from '@/types/sanity';
import { getStoreBySlug } from '@/app/services/sanity';
import { use, useEffect, useState } from 'react';

type Params = {
  slug: string;
};

const StorePage = ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const [store, setStore] = useState<SanityStoresRespose | undefined>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getStoreBySlug(slug).then((res) => {
      if (!res) {
        setError(true);
        return;
      }
      setStore(res);
    });
  }, [slug]);

  if (error) {
    return (
      <div>
        <h1>Nenhuma loja encontrada</h1>
        <p>A loja que você buscou parece não existir...</p>
      </div>
    );
  }

  if (!store) {
    return <div>Carregando...</div>;
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
};

export default StorePage;
