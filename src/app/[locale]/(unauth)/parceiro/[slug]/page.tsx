import type { StoreSchemaResponse } from '@/libs/sanity/types';
import Container from '@/components/Container';
import { ProductAndServiceCard } from '@/components/ProductAndServiceCard';
import { AboutUs } from '@/components/sections/Contact/AboutUsSection';
import { ContactInfo } from '@/components/sections/Contact/ContactInfoSection';
import { ContactUs } from '@/components/sections/Contact/ContactUsSection';
import { CtaAgility1 } from '@/components/sections/Cta/CtaAgilitySection1';
import { CtaAgility2 } from '@/components/sections/Cta/CtaAgilitySection2';
import { StoreHero } from '@/components/StoreHero';
import Typography from '@/components/Typography';
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
        <Typography variant="h1">Nenhuma loja encontrada</Typography>
        <Typography variant="body" tag="p">A loja que você buscou parece não existir...</Typography>
      </div>
    );
  }

  return (
    <div className="bg-backGround">
      <section id="StoreHero" className="pt-0">
        <StoreHero background={[store.image, store.image, store.image]} title={store.title} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac imperdiet metus, quis dapibus dui. " logo={store.image} />
      </section>
      <section id="Products">
        <Container className="flex flex-wrap justify-center lg:justify-start">
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
        </Container>
      </section>
      <section id="CtaAgility1">
        <CtaAgility1 />
      </section>

      <Container className="space-y-16 lg:max-w-[835px]">
        <section id="About-us">
          <AboutUs />
        </section>
        <section id="Contact" className="flex gap-8 flex-col sm:flex-row flex-wrap justify-between items-start sm:items-baseline">
          {/* TODO: <ContactInfo email={store.contact.email} phone={store.contact.phone} address={store.contact.address} instagram={store.contact.instagram} /> */}
          <ContactInfo />
          {/* TODO: <ContactUs email={store.contact.email} /> */}
          <ContactUs />
        </section>
      </Container>
      <CtaAgility2 />

    </div>
  );
}
