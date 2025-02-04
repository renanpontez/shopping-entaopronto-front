import { Button } from '@/components/atoms/Button';
import Container from '@/components/Container';
import { AppConfig } from '@/utils/AppConfig';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const t = useTranslations('BaseTemplate');

  const MENU_LINKS_MOCK = [
    { label: 'Início', href: '/' },
    { label: 'Categorias', href: '/categorias' },
    { label: 'Parceiros', href: '/parceiros' },
    { label: 'Contato', href: '/contato' },
  ];

  return (
    <div className="w-full antialiased">
      <header className="w-full bg-green-800 text-white py-10 from-primary to-primaryDark bg-linear-[160deg] from-[-10%] to-150%">
        <Container>
          <div className="flex flex-row justify-between items-center">
            <div className="relative w-auto h-full">
              <Image
                src="/assets/images/entao-pronto-logo-white.svg"
                alt="Logo"
                layout="intrinsic"
                width={200}
                height={64}
                className="h-full w-auto"
              />
            </div>
            <nav className="text-white hidden md:flex">
              <ul className="flex flex-wrap gap-x-8">
                {MENU_LINKS_MOCK.map(({ label, href }) => (
                  <li key={href} className="flex">
                    <a href={href} className="text-sm font-semibold uppercase hover:border-b-1 hover:border-white">{label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* mobile menu */}
            <div className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>

              <div className="absolute top-0 left-0 w-full h-full bg-primary z-50 hidden">
                <nav className="flex flex-col gap-5 items-center justify-center h-full">
                  {MENU_LINKS_MOCK.map(({ label, href }) => (
                    <a key={href} href={href} className="text-white text-2xl font-semibold uppercase">{label}</a>
                  ))}
                </nav>

              </div>
            </div>
          </div>
        </Container>
        <Container>
          <div className=" flex flex-col md:flex-row py-20 md:gap-15 lg:gap-20 items-center">
            <div className="flex flex-col gap-8 w-full md:w-4/5 lg:w-1/2 ">
              <h1>Conecte sua marca ao Shopping EntãoPronto</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis rerum ab ipsam dolore dignissimos sint quaerat sed sint quaerat sed.
              </p>
              <div className="flex flex-row gap-5">
                <Button href="/cadastro" variant="white">
                  Cadastre sua marca
                </Button>
                <Button href="/cadastro" variant="white-outlined">
                  Ver mais
                </Button>
              </div>
            </div>
            <div>
              <Image src="/assets/images/hero-img.svg" alt="" width={500} height={500} objectFit="cover" />
            </div>
          </div>
        </Container>

      </header>
      <div className="">

        <main>{props.children}</main>

        <footer className="border-t border-gray-300 bg-primary text-white w-full">
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

                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>

                </div>
              </div>
              <div className="flex flex-col gap-5 basis-1/4 ">
              </div>
              <div className="flex flex-col gap-5 basis-1/4 ">
                <h3>Menu</h3>
                <ul>
                  {MENU_LINKS_MOCK.map(({ label, href }) => (
                    <li key={href}>
                      <a href={href}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-5 basis-1/4 ">
                <h3>Contato</h3>
                <ul>
                  <li>
                    <a href="mailto:test@email.com">
                      Email
                    </a>
                  </li>
                  <li>
                    <a href="tel:+5511999999999">
                      Telefone
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </Container>
          <div className="py-5 bg-primary-700 w-full flex justify-center">
            <em className="text-sm">
              {`© Copyright ${new Date().getFullYear()} ${AppConfig.name}. `}
              {t.rich('made_with', {
                author: () => (
                  <a
                    href="https://agilitycreative.com"
                    className="text-blue-700 hover:border-b-2 hover:border-blue-700"
                  >
                    Agility Creative
                  </a>
                ),
              })}
            </em>
          </div>
        </footer>
      </div>
    </div>
  );
};
