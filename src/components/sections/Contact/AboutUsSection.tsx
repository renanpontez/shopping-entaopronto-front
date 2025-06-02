import type { PortableTextBlock } from '@portabletext/types';
import { Button } from '@/components/atoms/Button';
import PortableTextRenderer from '@/components/atoms/PortableText';
import Typography from '@/components/Typography';
import AgilityAboutUsImage from '@/public/assets/images/agility-about-us.svg';
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';

type Props = {
  imageUrl?: string;
  about?: PortableTextBlock;
};

export const AboutUs = ({ about, imageUrl }: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-5 justify-between items-stretch w-full relative">
      <div className="relative w-full md:max-w-[450px] aspect-square">
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
      <div className="w-full md:w-[50%] flex flex-col justify-around gap-2">
        <div>
          <Typography variant="h3" className="pb-4 text-dark">
            QUEM SOMOS
          </Typography>
          {about && (
            <Typography variant="body" tag="span" className="pb-3">
              <PortableTextRenderer value={about} />
            </Typography>
          )}
        </div>
        <div>
          <Button variant="primary-outlined" href="https://www.entaopronto.emp.br/">
            Quero conhecer mais
            <FaExternalLinkAlt size="14" className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
