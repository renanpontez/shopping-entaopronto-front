import type { ResolvedNavLink } from '@/utils/navigation';
import Container from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { MainNav } from './MainNav';
import { MobileNavbar } from './MobileNavbar';
import { Navbar } from './Navbar';

type HeaderProps = {
  links: ResolvedNavLink[];
};

export const Header = ({ links }: HeaderProps) => {
  return (
    <header className="absolute top-3 left-0 right-0 z-50 w-full">
      <Container>
        <div className="w-full container mx-auto">
          <div className="flex flex-row justify-between items-center py-3 bg-dark/20  backdrop-blur-xs mt-4 rounded-full shadow-lg px-6">
            <div className="relative w-auto h-full">
              <Link href="/">
                <Image
                  src="/assets/images/entao-pronto-symbol-white.svg"
                  alt="Logo"
                  width={150}
                  height={30}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <Navbar links={links} />
            <MobileNavbar mainNav={<MainNav links={links} />} />
          </div>
        </div>
      </Container>
    </header>
  );
};
