import type { CategorySchema, StoreSchemaResponse } from '@/libs/sanity/types';
import { Button } from '@/components/atoms/Button';
import Container from '@/components/Container';
import { CategoryList } from '@/components/sections/Category/CategoryList';
import { AboutUs } from '@/components/sections/Contact/AboutUsSection';
import { ContactInfo } from '@/components/sections/Contact/ContactInfoSection';
import { ContactUs } from '@/components/sections/Contact/ContactUsSection';
import { CtaAgility } from '@/components/sections/Cta/CtaAgility';
import { Hero } from '@/components/sections/Hero/Hero';
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
  const shopEntaoProntoContact = process.env.NEXT_PUBLIC_ENTAOPRONTO_WPP_CONTACT;

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
          <Container>
            <AboutUs />
          </Container>
        </section>

        <section id="Contact">
          <Container className="flex gap-8 flex-col sm:flex-row justify-between items-start sm:items-baseline py-10">
            <ContactInfo />
            <ContactUs whatsappContact={shopEntaoProntoContact} />
          </Container>
        </section>
      </div>

      <CtaAgility variant="purple" />
    </>
  );
};
