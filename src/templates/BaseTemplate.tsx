import { Header } from '@/components/atoms/Header/Header';
import { LinkItem } from '@/components/atoms/LinkItem';
import Container from '@/components/Container';
import Typography from '@/components/Typography';
import { getSiteSettings } from '@/libs/sanity/fetcher';
import { AppConfig } from '@/utils/AppConfig';
import { resolveNavLinks } from '@/utils/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare } from 'react-icons/fa';

type Props = {
  children: React.ReactNode;
};

export const BaseTemplate = async ({
  children,
}: Props) => {
  const t = await getTranslations('BaseTemplate');
  const settings = await getSiteSettings();
  const navLinks = resolveNavLinks(settings?.navigation);
  const contact = settings?.contactEntaopronto;
  const socials = settings?.socialMediaEntaopronto;

  const contactLinks = [
    contact?.email
      ? { label: contact.email, href: `mailto:${contact.email}` }
      : null,
    contact?.phone
      ? { label: contact.phone, href: `tel:${contact.phone.replace(/\D/g, '')}` }
      : null,
    contact?.whatsapp
      ? {
          label: `WhatsApp: ${contact.whatsapp}`,
          href: `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`,
        }
      : null,
  ].filter((link): link is { label: string; href: string } => link !== null);

  return (
    <div className="w-full antialiased">
      <Header links={navLinks} />
      <div>
        <main>{children}</main>
        <footer className="border-t-3 border-gray-300 bg-white w-full">
          <Container className="py-8 md:py-15">
            {/* flex 4 columns */}
            <div className="flex flex-col md:flex-row gap-10 justify-between">
              <div className="flex flex-col gap-5 basis-1/4">
                <div className=" gap-4 flex flex-col">
                  <div className="relative w-auto h-full max-w-64">
                    <Image
                      src="/assets/images/entao-pronto-logo.svg"
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
                      {socials?.youtube && (
                        <a target="_blank" rel="noreferrer noopener" href={socials.youtube} className="text-gray-400 hover:text-primary">
                          <FaYoutubeSquare size="24" />
                        </a>
                      )}
                      {socials?.facebook && (
                        <a target="_blank" rel="noreferrer noopener" href={socials.facebook} className="text-gray-400 hover:text-primary">
                          <FaFacebookSquare size="24" />
                        </a>
                      )}
                      {socials?.instagram && (
                        <a target="_blank" rel="noreferrer noopener" href={socials.instagram} className="text-gray-400 hover:text-primary">
                          <FaInstagramSquare size="24" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 basis-1/4" />
              <div className="flex flex-col gap-5 basis-1/4">
                <Typography variant="h6">Menu</Typography>
                <ul className="flex flex-col gap-2">
                  {navLinks.map(({ key, label, href, isExternal, openInNewTab }) => (
                    <li key={key}>
                      <LinkItem
                        href={href}
                        target={openInNewTab || isExternal ? '_blank' : undefined}
                        rel={openInNewTab || isExternal ? 'noopener noreferrer' : undefined}
                      >
                        {label}
                      </LinkItem>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-5 basis-1/4">
                <Typography variant="h6">Contato</Typography>
                <ul className="flex flex-col gap-2">
                  {contactLinks.map(({ label, href }) => (
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
