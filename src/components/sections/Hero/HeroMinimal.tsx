import Container from '@/components/Container';
import Typography from '@/components/Typography';

type Props = {
  title: string;
};

const HeroMinimal = ({ title }: Props) => (
  <div className="from-primary to-primary-700 bg-linear-[160deg] from-[-10%] to-150% text-white">
    <Container>
      <div className="flex flex-col md:flex-row py-5 md:py-10 gap-10 lg:gap-10 items-center">
        <Typography variant="h1">{title}</Typography>
      </div>
    </Container>
  </div>
);

export default HeroMinimal;
