import Container from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../Button';

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

type PartnerHeaderProps = {
  storeName: string;
};

export const PartnerHeader = ({ storeName }: PartnerHeaderProps) => {
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

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Button
                variant="link"
                onClick={() => scrollToSection('Products')}
              >
                Soluções
              </Button>
              <Button
                variant="link"
                onClick={() => scrollToSection('About-us')}
              >
                Sobre
                {' '}
                {storeName}
              </Button>
              <Button
                variant="link"
                onClick={() => scrollToSection('Contact')}
              >
                Contato
              </Button>
            </nav>

          </div>

          {/* Mobile Menu */}
          <div id="mobile-menu" className="hidden md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              <Button
                variant="link"
                onClick={() => {
                  scrollToSection('Products');
                  const menu = document.getElementById('mobile-menu');
                  if (menu) {
                    menu.classList.add('hidden');
                  }
                }}
              >
                Soluções
              </Button>
              <Button
                variant="link"
                onClick={() => {
                  scrollToSection('About-us');
                  const menu = document.getElementById('mobile-menu');
                  if (menu) {
                    menu.classList.add('hidden');
                  }
                }}
              >
                Sobre
                {' '}
                {storeName}
              </Button>
              <Button
                variant="link"
                onClick={() => {
                  scrollToSection('Contact');
                  const menu = document.getElementById('mobile-menu');
                  if (menu) {
                    menu.classList.add('hidden');
                  }
                }}
              >
                Contato
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};
