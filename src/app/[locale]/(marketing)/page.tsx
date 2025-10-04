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
import { CONTACT } from '@/utils/Constants';

export async function generateMetadata() {
  return {
    title: 'Início',
  };
}

export default async function Index() {
  const settings = await getSiteSettings();
  const categories = await getAllCategories();
  const stores = await getAllStores();

  return (
    <>
      <Hero.Primary
        title="Conecte-se sua marca ao Shopping EntãoPronto"
        // videoUrl="https://videos.openai.com/vg-assets/assets%2Ftask_01jnc96zqsfhpbm0q8w0pqtx1f%2Ftask_01jnc96zqsfhpbm0q8w0pqtx1f_genid_ef1d0b10-0133-422b-a09c-182e2f3328e5_25_03_02_20_37_508349%2Fvideos%2F00000_93576231%2Fmd.mp4?st=2025-07-14T13%3A40%3A50Z&se=2025-07-20T14%3A40%3A50Z&sks=b&skt=2025-07-14T13%3A40%3A50Z&ske=2025-07-20T14%3A40%3A50Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=pukayKWl0oGqY88O2jpXBFeQY9kdKBg3D%2FBzJTjgBaE%3D&az=oaivgprodscus"
        imageUrl="/assets/images/bg_mall.webp"
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
