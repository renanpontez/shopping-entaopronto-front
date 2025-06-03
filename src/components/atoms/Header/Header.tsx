import Container from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { MainNav } from './MainNav';
import { MobileNavbar } from './MobileNavbar';
import { Navbar } from './Navbar';

export const Header = () => {
  return (
    <header className="fixed top-3 left-0 right-0 z-50 w-full">
      <Container>
        <div className="w-full container mx-auto">
          <div className="flex flex-row justify-between items-center py-3 bg-white/90 backdrop-blur-sm mt-4 rounded-full shadow-lg px-10">
            <div className="relative w-auto h-full">
              <Link href="/">
                <Image
                  src="/assets/images/entao-pronto-logo.svg"
                  alt="Logo"
                  width={150}
                  height={30}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <Navbar />
            <MobileNavbar mainNav={<MainNav />} />
          </div>
        </div>
      </Container>
    </header>
  );
};
