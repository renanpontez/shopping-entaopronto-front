import { Header } from '@/components/atoms/Header/Header';
import { Footer } from '@/components/sections/Footer/Footer';

type Props = {
  children: React.ReactNode;
};

export const BaseTemplate = ({
  children,
}: Props) => {
  return (
    <div className="w-full antialiased">
      <Header />
      <div>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};
