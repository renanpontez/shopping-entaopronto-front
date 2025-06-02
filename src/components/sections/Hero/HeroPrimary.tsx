import { Button } from '@/components/atoms/Button';
import Container from '@/components/Container';
import Typography from '@/components/Typography';

type Props = {
  title: string;
  videoUrl?: string;
};

const HeroPrimary = ({ title, videoUrl = '/assets/images/test.mp4' }: Props) => (
  <div className="relative py-24 overflow-hidden pt-32">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="absolute inset-0 bg-black/70 z-10" />
    <div className="relative z-20">
      <Container>
        <div className="flex flex-col md:flex-row py-10 md:py-20 gap-15 lg:gap-20 items-center">
          <div className="flex flex-col gap-8 w-full md:w-4/5 lg:w-1/2">
            <Typography variant="h1" className="text-white">{title}</Typography>
            <Typography variant="body" className="text-white">
              Seus clientes estão navegando e você pode aumentar a exposição da sua marca com o Shopping EntãoPronto. Conheça já!
            </Typography>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <Button href="#Parceiros" variant="white" type="link">
                Conhecer parceiros
              </Button>
              <Button href="/contato" variant="white-outlined">
                Cadastre sua marca
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  </div>
);

export default HeroPrimary;
