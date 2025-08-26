import Container from '@/components/Container';
import { Hero } from '@/components/sections/Hero/Hero';
import { StoreList } from '@/components/sections/Store/StoreList';
import { get50PlusStores } from '@/libs/sanity/fetcher';

export default async function FiftyPlusPage() {
  const stores = await get50PlusStores();

  return (
    <>
      <Hero.Minimal title="Soluções 50+" subtitle="Vitrines que oferecem soluções específicas para pessoas 50+" />
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
    title: 'Vitrines | Shopping EntãoPronto!',
    description: 'Uma lista de todos os vitrines cadastrados no Shopping EntãoPronto',
  };
}
