'use client';
import type { SanityStoresRespose } from '@/types/sanity';
import { getStoresByCategorieSlug } from '@/app/services/sanity';
import { use, useEffect, useState } from 'react';

type Params = {
  slug: string;
};

const StoresByCategoryPage = ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const [stores, setStores] = useState<SanityStoresRespose[] | undefined>();
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getStoresByCategorieSlug(slug).then((res: SanityStoresRespose[]) => {
      setStores(res);
    }).catch(() => {
      setError(true);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [slug]);

  return (
    <div>
      { isLoading && (
        <div>Carregando...</div>
      )}
      {
        error && (
          <div>
            <h1>Houve um erro ao encontrar lojas desta categoria</h1>
          </div>
        )
      }
      { stores && !isLoading && (
        <div className="border-2 border-gray-500 p-4">
          {stores.map(store => (
            <div key={store._id}>
              <h1>{store.title}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default StoresByCategoryPage;
