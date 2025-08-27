import type { Metadata } from 'next';
import { routing } from '@/libs/i18nNavigation';
import { SanityLive } from '@/libs/sanity/live';
import { GoogleTagManager } from '@next/third-parties/google';
import classNames from 'classnames';
import { Montserrat } from 'next/font/google';

import '@/styles/global.css';

const montserratFont = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Shopping EntãoPronto!',
    default: 'Shopping EntãoPronto!',
  },
  description: 'O Shopping EntãoPronto! é uma plataforma para conectar negócios a clientes. Entre na rede e tenha sua vitrine online, conheça a EntãoPronto!',
  metadataBase: new URL('https://shoppingentaopronto.com.br'),
  alternates: {
    canonical: 'https://shoppingentaopronto.com.br',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Shopping EntãoPronto!',
    description: 'O Shopping EntãoPronto! é uma plataforma para conectar negócios a clientes. Entre na rede e tenha sua vitrine online, conheça a EntãoPronto!',
    url: 'https://shoppingentaopronto.com.br',
    siteName: 'Shopping EntãoPronto!',
    locale: 'pt-BR',
    type: 'website',
    images: [
      {
        url: '/assets/images/entao-pronto-logo.svg',
        width: 1200,
        height: 630,
        alt: 'Shopping EntãoPronto!',
        type: 'image/png',
      },
    ],
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <html lang="pt-BR" className={classNames(montserratFont.className, 'scroll-smooth')}>
      <GoogleTagManager gtmId="GTM-TRK8N8Z5" />
      <body suppressHydrationWarning>
        {props.children}
        <SanityLive />
      </body>
    </html>
  );
}
