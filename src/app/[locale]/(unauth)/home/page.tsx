'use client';
import type { SanityCategoryResponse, SanityStoreRespose } from '@/types/sanity';
import { getStoresAndCategories } from '@/app/services/sanity';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [stores, setStores] = useState<SanityStoreRespose[]>([]);
  const [categories, setCategories] = useState<SanityCategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStoresAndCategories()
      .then((res) => {
        setStores(res.stores);
        setCategories(res.categories);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div>
        <h1>Stores</h1>
        {stores.length === 0
          ? (
              <div>Nenhuma loja encontrada...</div>
            )
          : (
              stores.map(store => (
                <div key={store._id} className="border-1 p-4">
                  <h1>{store.title}</h1>
                  {store.productsOrServices.length === 0
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
        {categories.length === 0
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
};

export default HomePage;
