import { Button } from '@/components/atoms/Button';
import Container from '@/components/Container';
import Typography from '@/components/Typography';
import Image from 'next/image';

type Props = {
  title: string;
};

const HeroPrimary = ({ title }: Props) => (
  <div className="from-primary to-primary-700 bg-linear-[160deg] from-[-10%] to-150% text-white">
    <Container>
      <div className="flex flex-col md:flex-row py-10 md:py-20 gap-15 lg:gap-20 items-center">
        <div className="flex flex-col gap-8 w-full md:w-4/5 lg:w-1/2 ">
          <Typography variant="h1">{title}</Typography>
          <Typography variant="body">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis rerum ab ipsam dolore dignissimos sint quaerat sed sint quaerat sed.
          </Typography>
          <div className="flex flex-col md:flex-row gap-5 w-full">
            <Button href="/contato" variant="white">
              Cadastre sua marca
            </Button>
            <Button href="#Parceiros" variant="white-outlined" type="link">
              Ver mais
            </Button>
          </div>
        </div>
        <div>
          <Image src="/assets/images/hero-img.svg" alt="" width={500} height={500} objectFit="cover" />
        </div>
      </div>
    </Container>
  </div>
);

export default HeroPrimary;
