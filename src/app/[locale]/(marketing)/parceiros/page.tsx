import type { StoreSchemaResponse } from '@/libs/sanity/types';
import Container from '@/components/Container';
import { Hero } from '@/components/sections/Hero/Hero';
import { StoreList } from '@/components/sections/Store/StoreList';
import { sanityFetch } from '@/libs/sanity/live';
import { storesQuery } from '@/libs/sanity/queries';

export default async function StoresPage() {
  const storesRes = await sanityFetch({
    query: storesQuery,
  }) as { data: StoreSchemaResponse[] };

  const stores = storesRes?.data as StoreSchemaResponse[];

  return (
    <>
      <Hero.Minimal title="Todos os parceiros" />
      <section>
        <Container>
          <StoreList stores={stores} hideSidebar limit={-1} cols={3} />
        </Container>
        <Container className="py-50 my-50" />
      </section>
    </>
  );
}

export async function generateMetadata() {
  return {
    title: 'Parceiros | Shoppinh EntãoPronto!',
    description: 'Uma lista de todos os parceiros cadastrados no Shopping EntãoPronto',
  };
}
