import Container from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { MainNav } from './MainNav';
import { MobileNavbar } from './MobileNavbar';
import { Navbar } from './Navbar';

export const Header = () => {
  return (
    <header className="w-full bg-white shadow-md">
      <Container>
        <div className="flex flex-row justify-between items-center py-2 h-auto">
          <div className="relative w-auto h-full mt-1 mb-3">
            <Link href="/">
              <Image
                src="/assets/images/entao-pronto-logo.svg"
                alt="Logo"
                layout="intrinsic"
                width={200}
                height={64}
                className="h-full w-auto"
              />
            </Link>
          </div>
          <Navbar />
          <MobileNavbar mainNav={<MainNav />} />
        </div>
      </Container>
    </header>
  );
};
