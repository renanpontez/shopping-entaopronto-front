/**
 * Renders a page that displays a list of categories fetched from Sanity.
 * The page shows a loading state while the categories are being fetched, and then
 * displays the category titles and descriptions.
 */
'use client';
import type { SanityCategoriesResponse } from '@/types/sanity';
import { getCategories } from '@/app/services/sanity';
import { useEffect, useState } from 'react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<SanityCategoriesResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    }).finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading
        ? (
            <div>Carregando categorias...</div>
          )
        : (<h1 className="text-3xl font-bold">Categorias</h1>)}
      { categories.length === 0 && !isLoading
        ? (
            <div>Nenhuma categoria encontrada...</div>
          )
        : (
            <div className="border-2 border-gray-500 p-4">
              {categories.map(category => (
                <div key={category._id}>
                  <h2>{category.title}</h2>
                  <p>{category.description}</p>
                </div>
              ))}
            </div>
          )}
    </div>
  );
};
export default CategoriesPage;
