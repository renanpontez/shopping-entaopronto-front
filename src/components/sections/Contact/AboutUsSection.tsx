import { Button } from '@/components/atoms/Button';
import Typography from '@/components/Typography';
import AgilityAboutUsImage from '@/public/assets/images/agility-about-us.svg';
import Image from 'next/image';

export const AboutUs = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-5 justify-between items-stretch w-full relative">
      <div className="relative w-full md:max-w-[450px] aspect-square">
        <Image
          alt=""
          aria-hidden="true"
          className="w-full h-auto rounded-lg aspect-square"
          src={AgilityAboutUsImage}
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
          <Typography variant="body" tag="p" className="pb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo.
          </Typography>
          <Typography variant="body" tag="p" className="pb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
          </Typography>
        </div>
        <div>
          <Button variant="primary-outlined">Quero conhecer mais</Button>
        </div>
      </div>
    </div>
  );
};
