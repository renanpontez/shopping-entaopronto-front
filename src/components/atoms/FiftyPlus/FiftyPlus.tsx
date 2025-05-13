import Typography from '@/components/Typography';
import medalStamp from '@/public/assets/images/achievement-challenge-medal.svg';
import Image from 'next/image';

const FiftyPlus = () => {
  return (
    <span className="flex gap-1 items-center">
      <Image alt="medalha 50+" src={medalStamp} width={20} height={20}></Image>
      <Typography variant="extraSmall">[ Selo Cinquenta Mais ]</Typography>
    </span>
  );
};

export default FiftyPlus;
