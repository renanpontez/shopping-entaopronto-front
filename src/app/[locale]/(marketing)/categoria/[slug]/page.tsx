import type { StoreSchemaResponse } from '@/libs/sanity/types';
import Container from '@/components/Container';
import { Hero } from '@/components/sections/Hero/Hero';
import { StoreList } from '@/components/sections/Store/StoreList';
import Typography from '@/components/Typography';
import { sanityFetch } from '@/libs/sanity/live';
import { categoriesBySlugQuery, storesByCategoryIdQuery } from '@/libs/sanity/queries';

export default async function StoresByCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const categoryRes = await sanityFetch({
    query: categoriesBySlugQuery,
    params: { slug },
  }) as { data: StoreSchemaResponse };

  const categoryData = categoryRes?.data;

  if (!categoryData) {
    return (
      <div>
        <h1>Nenhuma categoria encontrada</h1>
        <p>Não existem categorias cadastradas com este apelido...</p>
      </div>
    );
  }

  // Get stores by category
  const storesRes = await sanityFetch({
    query: storesByCategoryIdQuery,
    params: { categoryId: categoryData._id },
  }) as { data: StoreSchemaResponse[] };

  const stores = storesRes?.data;

  return (
    <>
      <Hero.Primary title={categoryData.title} />

      <section>
        <Container>
          <Typography variant="h1" className="text-2xl mb-4">Lojas desta categoria</Typography>
          <StoreList stores={stores} />
        </Container>
      </section>
    </>
  );
}
