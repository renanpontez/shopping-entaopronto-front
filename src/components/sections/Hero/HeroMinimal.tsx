import Container from '@/components/Container';
import Typography from '@/components/Typography';

type Props = {
  title: string;
  subtitle?: string;
};

const HeroMinimal = ({ title, subtitle }: Props) => (
  <div className="from-primary pt-32 to-primary-700 bg-linear-[160deg] from-[-10%] to-150% text-white">
    <Container>
      <div className="flex flex-col py-5 md:py-10 gap-0 lg:gap-2">
        <Typography variant="h1">{title}</Typography>
        {subtitle && (
          <Typography variant="bodySmall" className="text-white">
            {subtitle}
          </Typography>
        )}
      </div>
    </Container>
  </div>
);

export default HeroMinimal;
