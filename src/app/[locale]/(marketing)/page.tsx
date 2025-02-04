import type { CategorySchema, StoreSchemaResponse } from '@/libs/sanity/types';
import Container from '@/components/Container';
import Loader from '@/components/Loader';
import { ContactUs } from '@/components/sections/Contact/ContactUsSection';
import Typography from '@/components/Typography';
import { sanityFetch } from '@/libs/sanity/live';
import { categoriesQuery, storesQuery } from '@/libs/sanity/queries';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import SVG from 'react-inlinesvg';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'Index',
  // });

  const categoriesRes = await sanityFetch({
    query: categoriesQuery,
  }) as { data: CategorySchema[] };
  const categories = categoriesRes?.data as CategorySchema[];

  const storeRes = await sanityFetch({
    query: storesQuery,
  }) as { data: StoreSchemaResponse[] };
  const stores = storeRes?.data as StoreSchemaResponse[];

  return (
    <div className="flex flex-col gap-12">
      <section>
        <Container className="flex flex-col gap-4">
          <Typography variant="h3">Categorias mais procuradas</Typography>
          <ul className="grid grid-cols-4 gap-10 py-6 justify-around w-full">
            {categories.concat(categories.concat(categories.concat(categories))).map(category => (
              <li key={category._id + new Date().toISOString() + Math.random()}>
                <a href={`/categoria/${category.slug.current}`} className="block flex flex-row gap-5 items-center hover:border-primary border border-transparent pr-4 rounded-lg">
                  <div className="bg-primary text-white p-4 rounded-lg aspect-square">
                    <SVG src={category?.icon?.svg} fontSize={36} style={{ margin: 'auto 0' }} loader={<Loader />} />
                  </div>
                  <div className="flex flex-col gap-0">
                    <Typography variant="h5">{category.title}</Typography>
                    {category.subCategories?.length && (
                      <Typography variant="body1" tag="span">
                        {category.subCategories?.length}
                        {' '}
                        sub-categorias
                      </Typography>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section>
        <Container className="flex flex-col gap-4">
          <Typography variant="h3">Parceiros em destaque</Typography>
          <ul className="grid grid-cols-3 gap-10">
            {stores.map(store => (
              <li key={store._id} className="shadow-md rounded-lg">
                <div className="bg-white w-full relative h-48">
                  <Image src={store.image} alt={store.title} fill objectFit="cover" className="rounded-t-lg" />
                </div>
                <div className="p-4 flex flex-col gap-4">
                  <Typography variant="h5">
                    {store.title}
                  </Typography>
                  <div className="flex flex-col gap-1">
                    <Typography variant="body1">
                      {store.category.title}
                    </Typography>
                    <Typography variant="body1">
                      Parceiro há 2 anos
                    </Typography>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section>
        {/* Quem somos */}
        <div className="flex">
          <div>
            <h3>Quem Somos</h3>
            <p>
              O Shopping EntãoPronto é um marketplace inovador que conecta você a diversas lojas e
              serviços exclusivos, garantindo a melhor experiência de compra online.
            </p>
          </div>
          <div>
            <img src="/assets/images/hero-img.svg" alt="Quem Somos" />
          </div>
        </div>
      </section>
      <section>
        {/* CTA Agility */}
        <div className="flex gap-10">
          <div>
            <h3>Transforme seu negócio com a Agility</h3>
            <p>
              Quer levar sua loja para o digital e alcançar novos clientes? A Agility tem a solução
              ideal para você!
            </p>
          </div>
          <div>
            <button>Saiba mais</button>
          </div>
        </div>
      </section>
      <section>
        {/* Contato */}
        <ContactUs />
      </section>
    </div>
  );
};
