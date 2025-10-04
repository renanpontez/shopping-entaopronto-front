import Container from '@/components/Container';
import { Hero } from '@/components/sections/Hero/Hero';
import { StoreList } from '@/components/sections/Store/StoreList';
import { getAllCategories, getSpecialtyStores } from '@/libs/sanity/fetcher';

export default async function ImpactEcossystemPage() {
  const stores = await getSpecialtyStores('impactEcossystem');
  const categories = await getAllCategories();

  return (
    <>
      <Hero.Minimal title="Soluções no Ecossistema de Impacto" subtitle="Vitrines que oferecem soluções para o Ecossistema de Impacto" />
      <section>
        <Container>
          <StoreList stores={stores} limit={-1} categories={categories} />
        </Container>
        <Container className="py-50 my-50" />
      </section>
    </>
  );
}

export async function generateMetadata() {
  return {
    title: 'Vitrines | Shopping EntãoPronto!',
    description: 'Uma lista de vitrines no Ecossistema de Impacto cadastradas no Shopping EntãoPronto',
  };
}
