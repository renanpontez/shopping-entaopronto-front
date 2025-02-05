import type { CategorySchema, StoreSchemaResponse } from '@/libs/sanity/types';
import { Hero } from '@/components/atoms/Header/Hero';
import Container from '@/components/Container';
import Loader from '@/components/Loader';
import { ContactUs } from '@/components/sections/Contact/ContactUsSection';
import Typography from '@/components/Typography';
import { sanityFetch } from '@/libs/sanity/live';
import { categoriesQuery, storesQuery } from '@/libs/sanity/queries';
import { buildStoreUrl } from '@/utils/URLs';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegClock } from 'react-icons/fa';
import SVG from 'react-inlinesvg';

const COMPANY_PLACEHOLDER = '/assets/images/company-placeholder.svg';

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
    <>
      <Hero />
      <div className="flex flex-col gap-8">
        <section>
          <Container className="flex flex-col gap-10">
            <Typography variant="h3">Categorias mais procuradas</Typography>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8 justify-around w-full">
              {categories.concat(categories.concat(categories.concat(categories))).map(category => (
                <li key={category._id + new Date().toISOString() + Math.random()}>
                  <Link href={`/categoria/${category.slug.current}`} className="flex flex-row gap-5 items-center hover:border-primary border border-transparent pr-4 rounded-lg">
                    <div className="bg-primary text-white p-4 rounded-lg aspect-square">
                      <SVG src={category?.icon?.svg} fontSize={36} style={{ margin: 'auto 0' }} loader={<Loader />} />
                    </div>
                    <div className="flex flex-col gap-0">
                      <Typography variant="h5">{category.title}</Typography>
                      {category.subCategories?.length && (
                        <Typography variant="body" tag="span">
                          {category.subCategories?.length}
                          {' '}
                          sub-categorias
                        </Typography>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
        <section id="Parceiros">
          <Container className="flex flex-col gap-10">
            <Typography variant="h3">Parceiros em destaque</Typography>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {stores.map(store => (
                <li key={store._id} className="shadow-md rounded-lg hover:shadow-lg">
                  <Link href={buildStoreUrl(store.slug)}>
                    <div className="bg-[url(/assets/images/background-texture.svg)] bg-cover w-full relative h-48 rounded-t-lg items-center flex">
                      <div className="size-24 relative mx-auto">
                        <Image
                          src={store.image ?? COMPANY_PLACEHOLDER}
                          alt={store.title}
                          fill
                          objectFit="cover"
                          className="rounded-full shadow-sm border-2 border-primary-700"
                        />
                      </div>
                    </div>
                    <div className="p-4 flex flex-col gap-4">
                      <Typography variant="h5">
                        {store.title}
                      </Typography>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-2 items-center">
                          <SVG src={store.category.icon.svg} fontSize={16} className="text-primary-600 w-6" />
                          <Typography variant="body">
                            {store.category.title}
                          </Typography>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          <FaRegClock size="16" className="text-primary-600 w-6" />
                          <Typography variant="body">
                            Parceiro há 2 anos
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Link>

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
              <Image src="/assets/images/hero-img.svg" alt="Quem Somos" />
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
              <button type="button">Saiba mais</button>
            </div>
          </div>
        </section>
        <section>
          {/* Contato */}
          <ContactUs />
        </section>
      </div>
    </>
  );
};
