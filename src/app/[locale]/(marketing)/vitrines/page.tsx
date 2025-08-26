import Container from '@/components/Container';
import { Hero } from '@/components/sections/Hero/Hero';
import { StoreList } from '@/components/sections/Store/StoreList';
import { getAllStores } from '@/libs/sanity/fetcher';

export default async function StoresPage() {
  const stores = await getAllStores();

  return (
    <>
      <Hero.Minimal title="Todos os vitrines" />
      <section>
        <Container>
          <StoreList stores={stores} limit={-1} />
        </Container>
        <Container className="py-50 my-50" />
      </section>
    </>
  );
}

export async function generateMetadata() {
  return {
    title: 'Vitrines | Shoppinh EntãoPronto!',
    description: 'Uma lista de todos os vitrines cadastrados no Shopping EntãoPronto',
  };
}
