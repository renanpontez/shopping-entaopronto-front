import type { LocalePrefixMode } from 'next-intl/routing';

const localePrefix: LocalePrefixMode = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'Shopping EntãoPronto',
  locales: ['pt', 'fr'],
  defaultLocale: 'pt',
  localePrefix,
};
