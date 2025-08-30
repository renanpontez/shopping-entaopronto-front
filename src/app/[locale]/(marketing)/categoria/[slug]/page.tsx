import { Breadcrumb } from '@/components/Breadcrumb';
import Container from '@/components/Container';
import { Hero } from '@/components/sections/Hero/Hero';
import { StoreList } from '@/components/sections/Store/StoreList';
import { getAllCategories, getCategoryBySlug, getStoresByCategoryId } from '@/libs/sanity/fetcher';

export default async function StoresByCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const categoryData = await getCategoryBySlug(slug);
  const categories = await getAllCategories();

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

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Categorias', href: '/categorias' },
    { label: categoryData.title, href: `/categoria/${slug}` },
  ];

  return (
    <>
      <Hero.Minimal title={categoryData.title} />
      <section>
        <Container className="flex flex-col gap-2 pb-20">
          <Breadcrumb breadcrumbs={breadcrumbs} />
          <StoreList
            stores={stores}
            limit={6}
            currentCategory={categoryData.slug}
            categories={categories}
          />
        </Container>
      </section>
    </>
  );
}
