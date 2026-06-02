import type { ResolvedNavLink } from '@/utils/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
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
          <div className="flex flex-row justify-between items-center py-3 px-5 sm:px-6 mt-4 rounded-full bg-black/25 backdrop-blur-md ring-1 ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <div className="relative w-auto h-full">
              <Link href="/" aria-label="Shopping EntãoPronto" className="block transition-opacity hover:opacity-90">
                <Image
                  src="/assets/images/entao-pronto-symbol-white.svg"
                  alt="Shopping EntãoPronto"
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
