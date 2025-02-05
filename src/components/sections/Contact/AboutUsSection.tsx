import { Button } from '@/components/atoms/Button';
import Typography from '@/components/Typography';
// import Image from 'next/image';

export const AboutUs = () => {
  return (
    <div className="flex">
      <div>
        {/* <Image className='sm:max-w-2xs w-fit h-auto' src={} /> */}

      </div>
      <Typography variant="h3">
        QUEM SOMOS
      </Typography>
      <Typography variant="body" tag="p">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
      </Typography>
      <Button variant="primary-outlined">Quero conhecer mais</Button>
    </div>
  );
};
