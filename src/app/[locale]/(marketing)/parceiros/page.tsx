import type { StoreSchemaResponse } from '@/libs/sanity/types';
import { Hero } from '@/components/atoms/Header/Hero';
import Container from '@/components/Container';
import { StoreList } from '@/components/sections/Store/StoreList';
import { sanityFetch } from '@/libs/sanity/live';
import { storesQuery } from '@/libs/sanity/queries';

export default async function StoresPage() {
  const storesRes = await sanityFetch({
    query: storesQuery,
  }) as { data: StoreSchemaResponse[] };

  const stores = storesRes?.data as StoreSchemaResponse[];

  if (!stores || stores.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Lojas</h1>
        <div>Nenhuma loja encontrada...</div>
      </div>
    );
  }

  return (
    <>
      <Hero.Minimal title="Todos os parceiros" />
      <section>
        <Container>
          <StoreList stores={stores} />
        </Container>
        <Container className="py-50 my-50" />
      </section>
    </>
  );
}
