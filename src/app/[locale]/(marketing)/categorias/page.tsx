import type { CategorySchema } from '@/libs/sanity/types';
import Container from '@/components/Container';
import { CategoryList } from '@/components/sections/Category/CategoryList';
import { Hero } from '@/components/sections/Hero/Hero';
import { sanityFetch } from '@/libs/sanity/live';
import { categoriesQuery } from '@/libs/sanity/queries';

export default async function CategoriesPage() {
  const categoriesRes = await sanityFetch({
    query: categoriesQuery,
  }) as { data: CategorySchema[] };

  const categories = categoriesRes?.data as CategorySchema[];

  return (
    <>
      <Hero.Minimal title="Todas as categorias" />
      <section>
        <Container>
          <CategoryList categories={categories} limit={-1} />
        </Container>
        <Container className="py-50 my-50" />
      </section>
    </>
  );
}

export async function generateMetadata() {
  return {
    title: 'Categorias | Shopping EntãoPronto!',
    description: 'Uma lista de todas as categorias que os parceiros podem ser cadastrados no Shopping EntãoPronto',
  };
}
