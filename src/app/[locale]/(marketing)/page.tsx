import type { CategorySchema, StoreSchemaResponse } from '@/libs/sanity/types';
import { Button } from '@/components/atoms/Button';
import { Hero } from '@/components/atoms/Header/Hero';
import Container from '@/components/Container';
import { CategoryList } from '@/components/sections/Category/CategoryList';
import { ContactUs } from '@/components/sections/Contact/ContactUsSection';
import { StoreList } from '@/components/sections/Store/StoreList';
import Typography from '@/components/Typography';
import { sanityFetch } from '@/libs/sanity/live';
import { categoriesQuery, storesQuery } from '@/libs/sanity/queries';
import { getTranslations, setRequestLocale } from 'next-intl/server';

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
      <Hero.Primary title="Conecte-se sua marca ao Shopping EntãoPronto" />
      <div className="flex flex-col gap-8">
        <section>
          <Container className="flex flex-col gap-10">
            <Typography variant="h3">Categorias mais procuradas</Typography>
            <CategoryList categories={categories} />
            <div className="w-full flex justify-center">
              <Button href="/categorias" variant="primary" type="link"> Ver todas as categorias</Button>
            </div>
          </Container>
        </section>
        <section id="Parceiros">
          <Container className="flex flex-col gap-10">
            <Typography variant="h3">Parceiros em destaque</Typography>
            <StoreList stores={stores} />
            <div className="w-full flex justify-center">
              <Button href="/parceiros" variant="primary" type="link"> Ver todas os parceiros</Button>
            </div>
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
    </>
  );
};
