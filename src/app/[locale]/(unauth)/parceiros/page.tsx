'use client';
import type { SanityStoreRespose } from '@/types/sanity';
import { getStores } from '@/app/services/sanity';
import { useEffect, useState } from 'react';

const StoresPage = () => {
  const [stores, setStores] = useState<SanityStoreRespose[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStores().then((res) => {
      setStores(res);
    }).finally(() => setIsLoading(false));
  }, []);
  return (
    <div>
      {isLoading
        ? (
            <div>Carregando lojas...</div>
          )
        : (<h1 className="text-3xl font-bold">Lojas</h1>)}
      { stores.length === 0 && !isLoading
        ? (
            <div>Nenhuma loja encontrada...</div>
          )
        : (
            <div className="flex gap-4">
              {stores.map(store => (
                <div key={store._id} className="border-2 border-gray-500 p-4">
                  <h2>{store.title}</h2>
                  <p>
                    {store.productsOrServices?.map(product => (
                      <div key={product._key}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                      </div>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          )}
    </div>
  );
};
export default StoresPage;
