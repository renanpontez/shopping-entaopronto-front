import Container from '@/components/Container';
import { CategoryList } from '@/components/sections/Category/CategoryList';
import { AboutUs } from '@/components/sections/Contact/AboutUsSection';
import { ContactInfo } from '@/components/sections/Contact/ContactInfoSection';
import { ContactUs } from '@/components/sections/Contact/ContactUsSection';
import { CtaAgility } from '@/components/sections/Cta/CtaAgility';
import { Hero } from '@/components/sections/Hero/Hero';
import { StoreList } from '@/components/sections/Store/StoreList';
import { getAllCategories, getAllStores, getSiteSettings } from '@/libs/sanity/fetcher';
import { CONTACT } from '@/utils/Constants';

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
  const settings = await getSiteSettings();
  const categories = await getAllCategories();
  const stores = await getAllStores();

  return (
    <>
      <Hero.Primary
        title="Conecte-se sua marca ao Shopping EntãoPronto"
        // videoUrl="https://media.cleanshot.cloud/media/31388/UTPA73WrWnFONyS03D3I12eLJYDYq1RueGL7DZee.mp4?Expires=1748904724&Signature=DunApc5oohk4Yhr1ZLsV0UnIyTuqtooF2s--uzM~081IPdZHgREJQsrMQvWqrXUvWHfyZ4w9OnfJi7yoR8fjQ5npb81Sjhq14xVcvSByuZsfW5Hn1Ru8y80~MILSD-XOjy5ZVj1hBvI1Mpqdt0hjjCH8vmSQQEybR~CWZI9zUDpM5CEeFN2seazCpuyNpoQ3yS6Y7Puqqcgu~TCfzRYtvIFVYWBybg0H7VECTh4EdsvK~lahEnIWRWax0TgG1ED7UYxaXghdTmI~SC6SF8viL8oEaccoL-EIaS4lrLf6wTUIKN7d8hpaqdFCi1hHRQLZBIDjNppaHVSdSWfcV-8sUg__&Key-Pair-Id=K269JMAT9ZF4GZ"
        videoUrl="/assets/images/testt.mp4"
      />
      <div className="flex flex-col gap-8">
        <section>
          <Container className="flex flex-col gap-10">
            <CategoryList categories={categories} limit={8} />
          </Container>
        </section>
        <section id="Parceiros">
          <Container className="flex flex-col gap-10">
            <StoreList stores={stores} limit={6} />
          </Container>
        </section>
        <section>
          <Container>
            <AboutUs
              about={settings.aboutUs?.description}
              imageUrl={settings?.aboutUs?.image}
            />
          </Container>
        </section>

        <section id="Contact">
          <Container className="flex gap-8 flex-col sm:flex-row justify-between items-start sm:items-baseline py-10">
            <ContactInfo />
            <ContactUs whatsappPhoneNumber={CONTACT.shoppingPhoneNumber} />
          </Container>
        </section>
      </div>

      <CtaAgility variant="purple" />
    </>
  );
};
