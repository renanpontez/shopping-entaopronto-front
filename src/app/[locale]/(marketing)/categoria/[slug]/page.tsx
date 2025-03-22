import Container from '@/components/Container';
import { Hero } from '@/components/sections/Hero/Hero';
import { StoreList } from '@/components/sections/Store/StoreList';
import Typography from '@/components/Typography';
import { getCategoryBySlug, getStoresByCategoryId } from '@/libs/sanity/fetcher';

export default async function StoresByCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const categoryData = await getCategoryBySlug(slug);

  if (!categoryData?._id) {
    return (
      <div>
        <h1>Nenhuma categoria encontrada</h1>
        <p>Não existem categorias cadastradas com este apelido...</p>
      </div>
    );
  }

  // Get stores by category
  const stores = await getStoresByCategoryId(categoryData._id);

  return (
    <>
      <Hero.Minimal title={categoryData.title} />
      <section>
        <Container className="flex flex-col gap-10 pb-20">
          <Typography variant="h1" className="text-xl mb-4">
            Lojas desta categoria
          </Typography>
          <StoreList stores={stores} />
        </Container>
      </section>
    </>
  );
}
