import Container from '@/components/Container';
import Typography from '@/components/Typography';
import Image from 'next/image';

const COMPANY_PLACEHOLDER = '/assets/images/company-placeholder.svg';
const BANNER_PLACEHOLDER = '/assets/images/bg-mall.webp';

type Props = {
  title: string;
  backgroundUrl?: string;
  logoUrl?: string;
  description?: string;
};

const HeroStore = ({
  title,
  backgroundUrl = BANNER_PLACEHOLDER,
  logoUrl = COMPANY_PLACEHOLDER,
  // description,
}: Props) => (
  <div
    className="relative pt-32 flex flex-col justify-center py-10 sm:py-16 w-full text-white text-center overflow-hidden bg-primary bg-cover bg-center"
    style={{ backgroundImage: `url(${backgroundUrl})` }}
  >
    <div className="absolute inset-0 bg-black/60" />
    <div className="relative z-10 pt-10">
      {logoUrl && (
        <div className="flex justify-center my-5">
          <Image src={logoUrl} alt="" aria-hidden="true" width={300} height={300} className="light object-cover rounded-xl w-24 h-24" />
        </div>
      )}
      <Container className="flex flex-col gap-4 pb-1 items-center">
        <Typography variant="h2">
          {title}
        </Typography>
        {/* TODO: CREATE PORTABLETEXT */}
        {/* <Typography variant="bodySmall" tag="p" className=" max-w-[400px] text-center">
           {description}
        </Typography> */}
      </Container>

    </div>
  </div>
);

export default HeroStore;
