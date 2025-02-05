import type { StoreSchemaResponse } from '@/libs/sanity/types';
import Container from '@/components/Container';
import { ProductAndServiceCard } from '@/components/ProductAndServiceCard';
import { StoreHero } from '@/components/StoreHero';
import { sanityFetch } from '@/libs/sanity/live';
import { storeBySlugQuery } from '@/libs/sanity/queries';

export default async function StorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const storeRes = await sanityFetch({
    query: storeBySlugQuery,
    params: { slug },
  }) as { data: StoreSchemaResponse };

  const store = storeRes?.data;

  if (!store) {
    return (
      <div>
        <h1>Nenhuma loja encontrada</h1>
        <p>A loja que você buscou parece não existir...</p>
      </div>
    );
  }

  return (
    <div>
      <StoreHero background={[store.image, store.image, store.image]} title={store.title} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac imperdiet metus, quis dapibus dui. " logo={store.image} />
      <Container>
        <section>
          {store.productsOrServices?.map(product => (
            <ProductAndServiceCard
              key={`id-${product.name}`}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              whatsappContact={product.whatsappContact}
            />
          ))}
        </section>
      </Container>
    </div>
  );
}
