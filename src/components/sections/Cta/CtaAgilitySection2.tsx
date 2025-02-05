import LogoFull from '@/public/assets/images/agility-completo-white.svg';
import Logo from '@/public/assets/images/agility-logo-white.svg';
import Image from 'next/image';

export const CtaAgility2 = () => {
  return (
    <div className="h-[30vh] bg-linear-90 from-[#0B0B0B] to-[#8734B3] w-full flex gap-6 items-center justify-center">
      <Image src={Logo} alt="cta-agility2" width={72} height={63} className="max-w-20 h-auto" />
      <Image src={LogoFull} alt="cta-agility2" width={197} height={56} className="max-w-48 h-auto" />
    </div>
  );
};
