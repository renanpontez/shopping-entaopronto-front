import Container from '@/components/Container';
import { ContactInfo } from '@/components/sections/Contact/ContactInfoSection';
import { ContactUs } from '@/components/sections/Contact/ContactUsSection';
import { Hero } from '@/components/sections/Hero/Hero';

export default async function ContactUsPage() {
  return (
    <>
      <Hero.Minimal title="Fale Conosco" />
      <section>
        <Container className="flex flex-col gap-10 pb-20">
          <section className="flex gap-20 flex-wrap justify-between">
            <ContactInfo />
            <ContactUs />
          </section>
        </Container>
      </section>
    </>
  );
}
