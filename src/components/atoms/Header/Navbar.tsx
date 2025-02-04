import { MENU_LINKS_MOCK } from '@/utils/URLs';
import Link from 'next/link';

export const Navbar = (): React.ReactNode => {
  return (
    <div className="relative">
      {/* Desktop Main Nav */}
      <nav className="text-white hidden md:flex">
        <ul className="flex flex-wrap gap-x-8 text-dark">
          {MENU_LINKS_MOCK.map(({ label, href }) => (
            <li key={href} className="flex">
              <Link href={href} className="text-sm font-semibold uppercase hover:border-b-1 hover:border-white">{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
