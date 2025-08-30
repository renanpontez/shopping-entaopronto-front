import Container from '@/components/Container';
import { Hero } from '@/components/sections/Hero/Hero';
import { StoreList } from '@/components/sections/Store/StoreList';
import { getAllCategories, getAllStores } from '@/libs/sanity/fetcher';

export default async function StoresPage() {
  const stores = await getAllStores();
  const categories = await getAllCategories();

  return (
    <>
      <Hero.Minimal title="Todos as vitrines" />
      <section>
        <Container>
          <StoreList stores={stores} limit={-1} categories={categories} />
        </Container>
        <Container className="py-10 my-10" />
      </section>
    </>
  );
}

export async function generateMetadata() {
  return {
    title: 'Vitrines | Shoppinh EntãoPronto!',
    description: 'Uma lista de todos as vitrines cadastradas no Shopping EntãoPronto',
  };
}
