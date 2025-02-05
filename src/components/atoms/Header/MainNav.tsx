'use server';

import { MENU_LINKS_MOCK } from '@/utils/URLs';
import Link from 'next/link';

export const MainNav = async () => {
  return (
    <nav className="flex flex-col items-top justify-left h-full gap-4 py-4 mt-4">
      {MENU_LINKS_MOCK.map(({ label, href }) => (
        <Link key={href} href={href} className="text-dark text-md font-medium pr-30  pb-2 border-b-1 border-gray-300 focus:font-semibold">{label}</Link>
      ))}
    </nav>
  );
};
