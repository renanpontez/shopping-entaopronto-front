import Image from 'next/image';
import Container from './Container';
import Typography from './Typography';

type BannerProps = {
  background: string;
  title: string;
  description: string;
  logo: string;
};

export const Banner: React.FC<BannerProps> = ({
  background,
  title,
  description,
  logo,
}) => {
  return (
    <div
      className="relative flex flex-col justify-center py-10 sm:py-16 w-full text-white text-center overflow-hidden bg-cover bg-center"
      role="img"
      aria-label={`Background image for store ${title}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10">
        <div className="flex justify-center my-10">
          <Image src={logo} alt={`Logo ${title}`} width={90} height={90} className="light rounded-xl w-24 h-24" />
        </div>
        <Container className="flex flex-col gap-4 pb-1 items-center">
          <Typography variant="h2">
            {title}
          </Typography>
          <Typography variant="bodySmall" tag="p" className=" max-w-[400px] text-center">
            {description}
          </Typography>
        </Container>

      </div>
    </div>
  );
};
