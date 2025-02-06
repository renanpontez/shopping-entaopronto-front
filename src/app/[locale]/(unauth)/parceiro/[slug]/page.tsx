import type { StoreSchemaResponse } from '@/libs/sanity/types';
import { StoreTag } from '@/components/atoms/StoreTag';
import { Banner } from '@/components/Banner';
import Container from '@/components/Container';
import { ProductOrServiceCard } from '@/components/ProductOrServiceCard';
import { AboutUs } from '@/components/sections/Contact/AboutUsSection';
import { ContactInfo } from '@/components/sections/Contact/ContactInfoSection';
import { ContactUs } from '@/components/sections/Contact/ContactUsSection';
import { CtaAgility } from '@/components/sections/Cta/CtaAgility';
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
    <div className="bg-gray-200">
      <section id="StoreHero" className="pt-0">
        <Banner
          background={store.image}
          title={store.title}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac imperdiet metus, quis dapibus dui. "
          logo={store.image}
        />
      </section>
      <section id="StoreHighlightedInfoSection">
        <Container className="flex justify-center gap-5 sm:justify-around items-center flex-wrap">

          <StoreTag
            title="Frete Grátis"
            description="Lorem ipsum dolor sit amet dolor it"
            icon={(
              <svg aria-hidden="true" width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.42615 21.6252C8.46818 21.7772 8.53971 21.9193 8.63667 22.0436C8.73363 22.1678 8.85412 22.2718 8.99125 22.3495C9.12839 22.4272 9.27949 22.4771 9.43592 22.4964C9.59235 22.5158 9.75106 22.5041 9.90297 22.462C10.0549 22.42 10.197 22.3485 10.3213 22.2515C10.4456 22.1546 10.5495 22.0341 10.6272 21.8969C10.7049 21.7598 10.7549 21.6087 10.7742 21.4523C10.7935 21.2958 10.7818 21.1371 10.7398 20.9852L8.42615 21.6252ZM1.53647 4.76102C1.38395 4.71647 1.22411 4.70266 1.06622 4.72037C0.908324 4.73809 0.755519 4.78698 0.61667 4.86422C0.477822 4.94145 0.355693 5.0455 0.257371 5.1703C0.159049 5.29511 0.08649 5.4382 0.0439053 5.59128C0.00132067 5.74435 -0.0104424 5.90435 0.00929874 6.06201C0.0290399 6.21966 0.0798922 6.37182 0.158905 6.50967C0.237918 6.64751 0.343518 6.7683 0.469579 6.86501C0.59564 6.96172 0.739651 7.03244 0.893257 7.07305L1.53647 4.76102ZM28.7176 22.3612C28.8739 22.3251 29.0213 22.258 29.1512 22.164C29.2811 22.0699 29.3908 21.9507 29.4738 21.8135C29.5569 21.6763 29.6116 21.5239 29.6347 21.3652C29.6579 21.2065 29.649 21.0448 29.6085 20.8896C29.5681 20.7344 29.497 20.5888 29.3993 20.4616C29.3017 20.3344 29.1796 20.228 29.0401 20.1487C28.9007 20.0695 28.7468 20.019 28.5875 20.0003C28.4282 19.9815 28.2668 19.9949 28.1128 20.0396L28.7176 22.3612ZM12.7318 25.2957C13.2278 27.0877 12.1398 28.9805 10.2134 29.4813L10.8166 31.803C13.9798 30.9822 15.9126 27.7997 15.0454 24.6557L12.7318 25.2957ZM10.2134 29.4813C8.27415 29.9853 6.32853 28.8589 5.82932 27.0509L3.51569 27.6909C4.3797 30.819 7.66614 32.6222 10.8166 31.803L10.2134 29.4813ZM5.82932 27.0509C5.33331 25.2589 6.42133 23.3661 8.34775 22.8653L7.74454 20.5452C4.5813 21.366 2.64688 24.5469 3.51569 27.6909L5.82932 27.0509ZM8.34775 22.8653C10.287 22.3612 12.2326 23.4877 12.7318 25.2957L15.0454 24.6557C14.1814 21.5276 10.895 19.7244 7.74454 20.5436L8.34775 22.8653ZM10.7398 20.9852L7.29654 8.52107L4.98291 9.16108L8.42615 21.6252L10.7398 20.9852ZM4.2629 5.51623L1.53647 4.76102L0.893257 7.07305L3.62129 7.82986L4.2629 5.51623ZM7.29654 8.52107C7.09311 7.80104 6.70681 7.1459 6.17522 6.61935C5.64364 6.09281 4.98484 5.71279 4.2629 5.51623L3.62449 7.82986C4.3045 8.01866 4.81011 8.53547 4.98291 9.16108L7.29654 8.52107ZM14.1926 26.1373L28.7176 22.3612L28.1144 20.0396L13.5878 23.8157L14.1926 26.1373Z" fill="#2BA56A" />
                <path d="M27.0807 7.17844C26.3047 4.36881 25.9159 2.96399 24.7766 2.32558C23.6342 1.68557 22.1862 2.06318 19.2902 2.81679L16.2181 3.6136C13.3221 4.36561 11.8741 4.74321 11.2165 5.85043C10.5573 6.95604 10.9445 8.36086 11.7205 11.1689L12.5445 14.1497C13.3205 16.9578 13.7077 18.3626 14.8485 19.001C15.9893 19.641 17.4373 19.2634 20.3334 18.5114L23.4054 17.7114C26.3015 16.9594 27.7495 16.5834 28.4087 15.4777C28.7703 14.8697 28.8167 14.1721 28.6551 13.2009" stroke="#2BA56A" stroke-width="3" stroke-linecap="round" />
              </svg>
            )}
          />
          <StoreTag
            title="Foco do Resultado"
            description="Lorem ipsum dolor sit amet dolor it"
            icon={(
              <svg aria-hidden="true" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 30C12.925 30 10.975 29.606 9.15 28.818C7.325 28.03 5.7375 26.9615 4.3875 25.6125C3.0375 24.2635 1.969 22.676 1.182 20.85C0.395002 19.024 0.0010019 17.074 1.89873e-06 15C-0.000998101 12.926 0.393002 10.976 1.182 9.15C1.971 7.324 3.0395 5.7365 4.3875 4.3875C5.7355 3.0385 7.323 1.97 9.15 1.182C10.977 0.394 12.927 0 15 0C17.073 0 19.023 0.394 20.85 1.182C22.677 1.97 24.2645 3.0385 25.6125 4.3875C26.9605 5.7365 28.0295 7.324 28.8195 9.15C29.6095 10.976 30.003 12.926 30 15C29.997 17.074 29.603 19.024 28.818 20.85C28.033 22.676 26.9645 24.2635 25.6125 25.6125C24.2605 26.9615 22.673 28.0305 20.85 28.8195C19.027 29.6085 17.077 30.002 15 30ZM15 27C18.35 27 21.1875 25.8375 23.5125 23.5125C25.8375 21.1875 27 18.35 27 15C27 11.65 25.8375 8.8125 23.5125 6.4875C21.1875 4.1625 18.35 3 15 3C11.65 3 8.8125 4.1625 6.4875 6.4875C4.1625 8.8125 3 11.65 3 15C3 18.35 4.1625 21.1875 6.4875 23.5125C8.8125 25.8375 11.65 27 15 27ZM15 24C12.5 24 10.375 23.125 8.625 21.375C6.875 19.625 6 17.5 6 15C6 12.5 6.875 10.375 8.625 8.625C10.375 6.875 12.5 6 15 6C17.5 6 19.625 6.875 21.375 8.625C23.125 10.375 24 12.5 24 15C24 17.5 23.125 19.625 21.375 21.375C19.625 23.125 17.5 24 15 24ZM15 21C16.65 21 18.0625 20.4125 19.2375 19.2375C20.4125 18.0625 21 16.65 21 15C21 13.35 20.4125 11.9375 19.2375 10.7625C18.0625 9.5875 16.65 9 15 9C13.35 9 11.9375 9.5875 10.7625 10.7625C9.5875 11.9375 9 13.35 9 15C9 16.65 9.5875 18.0625 10.7625 19.2375C11.9375 20.4125 13.35 21 15 21ZM15 18C14.175 18 13.469 17.7065 12.882 17.1195C12.295 16.5325 12.001 15.826 12 15C11.999 14.174 12.293 13.468 12.882 12.882C13.471 12.296 14.177 12.002 15 12C15.823 11.998 16.5295 12.292 17.1195 12.882C17.7095 13.472 18.003 14.178 18 15C17.997 15.822 17.7035 16.5285 17.1195 17.1195C16.5355 17.7105 15.829 18.004 15 18Z" fill="#2BA56A" />
              </svg>

            )}
          />
          <StoreTag
            title="Transparência"
            description="Lorem ipsum dolor sit amet dolor it"
            icon={(
              <svg aria-hidden="true" width="31" height="21" viewBox="0 0 31 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 6.3C16.6211 6.3 17.6964 6.7425 18.4891 7.53015C19.2819 8.3178 19.7273 9.38609 19.7273 10.5C19.7273 11.6139 19.2819 12.6822 18.4891 13.4698C17.6964 14.2575 16.6211 14.7 15.5 14.7C14.3789 14.7 13.3036 14.2575 12.5109 13.4698C11.7181 12.6822 11.2727 11.6139 11.2727 10.5C11.2727 9.38609 11.7181 8.3178 12.5109 7.53015C13.3036 6.7425 14.3789 6.3 15.5 6.3ZM15.5 0C22.5455 0 28.5623 4.354 31 10.5C28.5623 16.646 22.5455 21 15.5 21C8.45455 21 2.43773 16.646 0 10.5C2.43773 4.354 8.45455 0 15.5 0ZM3.07182 10.5C4.21072 12.8104 5.9792 14.757 8.17622 16.1186C10.3732 17.4801 12.9106 18.2018 15.5 18.2018C18.0894 18.2018 20.6268 17.4801 22.8238 16.1186C25.0208 14.757 26.7893 12.8104 27.9282 10.5C26.7893 8.18957 25.0208 6.24295 22.8238 4.88144C20.6268 3.51993 18.0894 2.79815 15.5 2.79815C12.9106 2.79815 10.3732 3.51993 8.17622 4.88144C5.9792 6.24295 4.21072 8.18957 3.07182 10.5Z" fill="#2BA56A" />
              </svg>

            )}
          />
        </Container>
      </section>
      <section id="Products">
        <Container className="flex flex-wrap justify-center lg:justify-start">
          {store.productsOrServices?.map(product => (
            <ProductOrServiceCard
              storeName={store.title}
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
        <CtaAgility variant="light" classname="!py-10 !sm:py-14" />
      </section>

      <Container className="space-y-16">
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
      <CtaAgility variant="purple" />

    </div>
  );
}
