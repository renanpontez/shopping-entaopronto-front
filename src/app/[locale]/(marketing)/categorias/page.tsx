import Container from '@/components/Container';
import { CategoryList } from '@/components/sections/Category/CategoryList';
import { Hero } from '@/components/sections/Hero/Hero';
import { getAllCategories } from '@/libs/sanity/fetcher';

export default async function CategoriesPage() {
  const categories = await getAllCategories();

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
    description: 'Uma lista de todas as categorias que os vitrines podem ser cadastrados no Shopping EntãoPronto',
  };
}
