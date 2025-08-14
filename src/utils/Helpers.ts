import { routing } from '@/libs/i18nNavigation';

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (
    process.env.VERCEL_ENV === 'production'
    && process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

export const getI18nPath = (url: string, locale: string) => {
  if (locale === routing.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};
export const getPartnershipDuration = (startDate: string) => {
  const start = new Date(startDate);
  const now = new Date();

  const diffInMilliseconds = now.getTime() - start.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays < 30) {
    return `Vitrine há ${diffInDays}d`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `Vitrine há ${diffInMonths}m`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `Vitrine há ${diffInYears}a`;
};
