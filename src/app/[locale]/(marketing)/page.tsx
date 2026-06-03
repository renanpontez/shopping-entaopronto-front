import Container from '@/components/Container';
import { CategoryList } from '@/components/sections/Category/CategoryList';
import { AboutUs } from '@/components/sections/Contact/AboutUsSection';
import { ContactInfo } from '@/components/sections/Contact/ContactInfoSection';
import { ContactUs } from '@/components/sections/Contact/ContactUsSection';
import { CtaAgility } from '@/components/sections/Cta/CtaAgility';
import { Hero } from '@/components/sections/Hero/Hero';
import PartnerLogos from '@/components/sections/Partner/PartnerLogos';
import { StoreList } from '@/components/sections/Store/StoreList';
import { getAllCategories, getAllStores, getSiteSettings } from '@/libs/sanity/fetcher';
import { getInstagramHandle } from '@/utils/Helpers';

export async function generateMetadata() {
  return {
    title: 'Início',
  };
}

export default async function Index() {
  const settings = await getSiteSettings();
  const categories = await getAllCategories();
  const stores = await getAllStores();
  const contact = settings?.contactEntaopronto;
  const socials = settings?.socialMediaEntaopronto;
  const hero = settings?.hero;

  return (
    <>
      <Hero.Primary
        title={hero?.title || 'Conecte-se sua marca ao Shopping EntãoPronto'}
        media={{
          type: hero?.mediaType,
          image: hero?.image,
          videoMp4: hero?.videoMp4,
          videoWebm: hero?.videoWebm,
          poster: hero?.poster,
        }}
        brandCategories={categories.map(category => ({
          label: category.title,
          value: category.slug,
        }))}
        whatsappPhone={settings?.contactEntaopronto?.whatsapp}
      />
      <div className="flex flex-col gap-3 md:gap-8">
        <section id="Vitrines">
          <Container className="flex flex-col gap-10">
            <StoreList stores={stores} limit={28} categories={categories} />
          </Container>
        </section>
        <section>
          <Container className="flex flex-col gap-10">
            <CategoryList categories={categories} limit={9} />
          </Container>
        </section>
        <section id="VitrinesSlide">
          <Container>
            <PartnerLogos stores={stores} />
          </Container>
        </section>
        <section>
          <Container>
            <AboutUs
              about={settings.aboutUs?.description}
              imageUrl={settings?.aboutUs?.image}
              whatsappPhone={contact?.whatsapp}
            />
          </Container>
        </section>

        <section id="Contact">
          <Container className="flex gap-8 flex-col sm:flex-row justify-between items-start sm:items-baseline py-10">
            <ContactInfo
              email={contact?.email}
              phone={contact?.phone}
              instagram={getInstagramHandle(socials?.instagram)}
            />
            <ContactUs whatsappPhoneNumber={contact?.whatsapp} />
          </Container>
        </section>
      </div>

      <CtaAgility variant="purple" />
    </>
  );
};
