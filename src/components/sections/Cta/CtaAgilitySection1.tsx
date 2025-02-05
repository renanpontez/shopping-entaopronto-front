import LogoFull from '@/public/assets/images/agility-completo-primary.svg';
import Logo from '@/public/assets/images/agility-logo-primary.svg';
import Image from 'next/image';

export const CtaAgility1 = () => {
  return (
    <div className="h-[20vh] bg-grayLight w-full flex gap-6 items-center justify-center">
      <Image src={Logo} alt="cta-agility2" width={72} height={63} className="max-w-5 sm:max-w-20h-auto" />
      <Image src={LogoFull} alt="cta-agility2" width={197} height={56} className="max-w-14 sm:max-w-48h-auto" />
    </div>
  );
};
