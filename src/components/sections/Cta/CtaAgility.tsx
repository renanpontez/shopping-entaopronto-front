import logoFullWhite from '@/public/assets/images/agility-completo-primary.svg';
import logoFullPurple from '@/public/assets/images/agility-completo-white.svg';
import logoWhite from '@/public/assets/images/agility-logo-primary.svg';
import logoPurple from '@/public/assets/images/agility-logo-white.svg';
import Image from 'next/image';

type CtaAgilityProps = {
  variant?: 'light' | 'purple';
  classname?: string;
};

export const CtaAgility = ({ variant = 'light', classname }: CtaAgilityProps) => {
  const variantSelection = {
    light: {
      logo: logoWhite,
      logoFull: logoFullWhite,
      backGround: 'bg-grayLight',
    },
    purple: {
      logo: logoPurple,
      logoFull: logoFullPurple,
      backGround: 'bg-linear-90 from-darker to-purple',
    },
  };

  return (
    <div className={`py-16 sm:py-20 w-full flex gap-6 items-center justify-center ${variantSelection[variant].backGround} ${classname}`}>
      <Image src={variantSelection[variant].logo} alt="Agility brand logo" width={72} height={63} className="max-w-5 sm:max-w-20 h-auto" />
      <Image src={variantSelection[variant].logoFull} alt="Agility full logo" width={197} height={56} className="max-w-14 sm:max-w-32 h-auto" />
    </div>
  );
};
