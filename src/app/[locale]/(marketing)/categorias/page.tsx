import type { CategorySchema } from '@/libs/sanity/types';
import { Hero } from '@/components/atoms/Header/Hero';
import Container from '@/components/Container';
import { CategoryList } from '@/components/sections/Category/CategoryList';
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
    <>
      <Hero title="Todas as categorias" variant="minimal" />
      <section>
        <Container>
          <CategoryList categories={categories} />
        </Container>
        <Container className="py-50 my-50" />
      </section>
    </>
  );
}
