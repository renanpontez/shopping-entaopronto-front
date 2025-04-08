import { Header } from '@/components/atoms/Header/Header';
import { LinkItem } from '@/components/atoms/LinkItem';
import Container from '@/components/Container';
import Typography from '@/components/Typography';
import { AppConfig } from '@/utils/AppConfig';
import { MENU_LINKS_MOCK } from '@/utils/URLs';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FaInstagramSquare, FaLinkedin, FaYoutubeSquare } from 'react-icons/fa';

type Props = {
  children: React.ReactNode;
};

export const BaseTemplate = ({
  children,
}: Props) => {
  const t = useTranslations('BaseTemplate');

  const MENU_SECONDARY_LINKS_MOCK = [
    { label: 'Quero cadastrar minha loja', href: 'https://web.whatsapp.com' },
    { label: 'email@contato.com.br', href: 'mailto:email@contato.com.br' },
    { label: '(85) 99874.1111', href: 'tel:+5511999999999' },
  ];

  return (
    <div className="w-full antialiased">
      <Header />
      <div>
        <main>{children}</main>
        <footer className="border-t-3 border-gray-300 bg-white w-full">
          <Container className="py-8 md:py-15">
            {/* flex 4 columns */}
            <div className="flex flex-col md:flex-row gap-10 justify-between">
              <div className="flex flex-col gap-5 basis-1/4">
                <div className=" gap-4 flex flex-col">
                  <div className="relative w-auto h-full">
                    <Image
                      src="/assets/images/entao-pronto-logo-white.svg"
                      alt="Logo"
                      layout="intrinsic"
                      width={120}
                      height={20}
                      className="h-auto w-auto"
                    />
                  </div>

                  <Typography variant="bodySmall">Conectando talentos, acelerando negócios e criando soluções com propósito. </Typography>

                  <div className="flex flex-col gap-2">
                    <Typography variant="body">
                      Siga nossas redes:
                    </Typography>
                    <div className="flex flex-row gap-2">
                      <a href="https://www.instagram.com" className="text-gray-400 hover:text-primary">
                        <FaInstagramSquare size="24" />
                      </a>
                      <a href="https://www.instagram.com" className="text-gray-400 hover:text-primary">
                        <FaYoutubeSquare size="24" />
                      </a>
                      <a href="https://www.instagram.com" className="text-gray-400 hover:text-primary">
                        <FaLinkedin size="24" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 basis-1/4" />
              <div className="flex flex-col gap-5 basis-1/4">
                <Typography variant="h6">Menu</Typography>
                <ul className="flex flex-col gap-2">
                  {MENU_LINKS_MOCK.map(({ label, href }) => (
                    <li key={href}>
                      <LinkItem href={href}>{label}</LinkItem>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-5 basis-1/4">
                <Typography variant="h6">Contato</Typography>
                <ul className="flex flex-col gap-2">
                  {MENU_SECONDARY_LINKS_MOCK.map(({ label, href }) => (
                    <li key={href}>
                      <LinkItem href={href}>{label}</LinkItem>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
          <div className="py-5 bg-white-300 w-full flex justify-center">
            <Container>
              <em className="text-sm">
                {`© Copyright ${new Date().getFullYear()} ${AppConfig.name}. `}
                {t.rich('made_with', {
                  author: () => (
                    <a
                      href="https://agilitycreative.com"
                      className="text-blue-700 hover:border-b-2 hover:border-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Agility Creative
                    </a>
                  ),
                })}
              </em>
            </Container>
          </div>
        </footer>
      </div>
    </div>
  );
};
