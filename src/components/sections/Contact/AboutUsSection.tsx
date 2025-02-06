import { Button } from '@/components/atoms/Button';
import Typography from '@/components/Typography';
import AgilityAboutUsImage from '@/public/assets/images/agility-about-us.svg';
import Image from 'next/image';

export const AboutUs = () => {
  return (
    <div className="flex gap-5 sm:gap-16 flex-wrap items-center justify-center lg:flex-nowrap">
      <Image alt="" aria-hidden="true" className="w-auto h-full rounded-lg object-fill" src={AgilityAboutUsImage} width={370} height={290} />
      <div>
        <Typography variant="h3" className="pb-4 text-dark">
          QUEM SOMOS
        </Typography>
        <Typography variant="body" tag="p" className="pb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo.
        </Typography>
        <Typography variant="body" tag="p" className="pb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
        </Typography>
        <Button variant="primary-outlined">Quero conhecer mais</Button>
      </div>
    </div>
  );
};
