'use client';
import type { PortableTextBlock } from '@portabletext/types';
import { Button } from '@/components/atoms/Button';
import PortableTextRenderer from '@/components/atoms/PortableText';
import Typography from '@/components/Typography';
import AgilityAboutUsImage from '@/public/assets/images/agility-about-us.svg';
import { CONTACT } from '@/utils/Constants';
import { getGeneralInfoWhatsAppMessage, openWhatsAppChat } from '@/utils/Whatsapp';
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';

type Props = {
  imageUrl?: string;
  about?: PortableTextBlock;
};

export const AboutUs = ({ about, imageUrl }: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-20 justify-between items-start w-full relative">
      <div className="flex flex-col gap-2 w-full md:w-1/2">
        <div className="flex flex-col gap-4 pb-5">
          <Typography variant="h2" className="text-dark">
            Quem Somos
          </Typography>

          {about && (
            <Typography variant="body" tag="span" className="pb-3">
              <PortableTextRenderer value={about} />
            </Typography>
          )}
        </div>
        <div>
          <Button variant="secondary-outlined" onClick={() => openWhatsAppChat(CONTACT.shoppingPhoneNumber, getGeneralInfoWhatsAppMessage)}>
            Quero contratar
            <FaExternalLinkAlt size="14" className="ml-2" />
          </Button>
        </div>
      </div>
      <div className="relative w-full md:w-[30%] aspect-square">
        <Image
          alt=""
          aria-hidden="true"
          className="w-full h-auto rounded-lg aspect-square"
          src={imageUrl ?? AgilityAboutUsImage}
          sizes="100vw"
          fill
          objectFit="cover"
        />
      </div>
    </div>
  );
};
