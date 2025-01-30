import type { CategorySchema } from '@/libs/sanity/types';
import { sanityFetch } from '@/libs/sanity/live';
import { categoriesQuery } from '@/libs/sanity/queries';

export default async function CategoriesPage() {
  const categoriesRes = await sanityFetch({
    query: categoriesQuery,
  }) as { data: CategorySchema[] };

  const categories = categoriesRes?.data as CategorySchema[];

  if (!categories || categories.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Categorias</h1>
        <div>Nenhuma categoria encontrada...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Categorias</h1>
      <div className="border-2 border-gray-500 p-4">
        {categories.map(category => (
          <div key={category._id}>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
