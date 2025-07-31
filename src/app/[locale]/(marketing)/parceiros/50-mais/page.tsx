import type { StoreSchemaResponse } from '@/libs/sanity/types';
import Container from '@/components/Container';
import { Hero } from '@/components/sections/Hero/Hero';
import { StoreList } from '@/components/sections/Store/StoreList';
import { sanityFetch } from '@/libs/sanity/live';
import { storesQueryWithFiftyPlus } from '@/libs/sanity/queries';

export default async function StoresPage() {
  const storesRes = await sanityFetch({
    query: storesQueryWithFiftyPlus,
  }) as { data: StoreSchemaResponse[] };

  const stores = storesRes?.data as StoreSchemaResponse[];

  return (
    <>
      <Hero.Minimal title="Soluções 50+" subtitle="Parceiros que oferecem soluções específicas para pessoas 50+" />
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
    title: 'Parceiros | Shopping EntãoPronto!',
    description: 'Uma lista de todos os parceiros cadastrados no Shopping EntãoPronto',
  };
}
