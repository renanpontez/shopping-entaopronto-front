import type { Metadata } from 'next';
import arcjet, { detectBot, request } from '@/libs/Arcjet';
import { Env } from '@/libs/Env';
import { routing } from '@/libs/i18nNavigation';
import { SanityLive } from '@/libs/sanity/live';
import classNames from 'classnames';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Montserrat } from 'next/font/google';
import { notFound } from 'next/navigation';
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

// Improve security with Arcjet
const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    // Block all bots except the following
    allow: [
      // See https://docs.arcjet.com/bot-protection/identifying-bots
      'CATEGORY:SEARCH_ENGINE', // Allow search engines
      'CATEGORY:PREVIEW', // Allow preview links to show OG images
      'CATEGORY:MONITOR', // Allow uptime monitoring services
    ],
  }),
);

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Verify the request with Arcjet
  if (Env.ARCJET_KEY) {
    const req = await request();
    const decision = await aj.protect(req);

    // These errors are handled by the global error boundary, but you could also
    // redirect or show a custom error page
    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        throw new Error('No bots allowed');
      }

      throw new Error('Access denied');
    }
  }

  // Using internationalization in Client Components
  const messages = await getMessages();

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.
  return (
    <html lang={locale} className={classNames(montserratFont.className, 'scroll-smooth')}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          {props.children}
        </NextIntlClientProvider>
        <SanityLive />
      </body>
    </html>
  );
}
