'use client';
import { Button } from '@/components/atoms/Button';
import Container from '@/components/Container';
import Typography from '@/components/Typography';
import { CONTACT } from '@/utils/Constants';
import { createStoreInfoWhatsAppMessage, openWhatsAppChat } from '@/utils/Whatsapp';
import Image from 'next/image';

type Props = {
  title: string;
};

const HeroPrimary = ({ title }: Props) => (
  <div className="from-primary to-primary-700 bg-linear-[160deg] from-[-10%] to-150% text-white">
    <Container>
      <div className="flex flex-col md:flex-row py-10 md:py-20 gap-15 lg:gap-20 items-center">
        <div className="flex flex-col gap-8 w-full md:w-4/5 lg:w-1/2 ">
          <Typography variant="h1">{title}</Typography>
          <Typography variant="body">
            Seus clientes estão navegando e você pode aumentar a exposição da sua marca com o Shopping EntãoPronto. Conheça já!
          </Typography>
          <div className="flex flex-col md:flex-row gap-5 w-full">
            <Button href="#Parceiros" variant="white" type="link">
              Conhecer parceiros
            </Button>
            <Button onClick={() => openWhatsAppChat(CONTACT.shoppingPhoneNumber, createStoreInfoWhatsAppMessage)} variant="white-outlined">
              Cadastre sua marca
            </Button>
          </div>
        </div>
        <div>
          <Image src="/assets/images/hero-img.svg" alt="" width={500} height={500} objectFit="cover" />
        </div>
      </div>
    </Container>
  </div>
);

export default HeroPrimary;
