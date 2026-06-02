import type { ResolvedNavLink } from '@/utils/navigation';
import Link from 'next/link';
import { HiArrowUpRight } from 'react-icons/hi2';

type NavbarProps = {
  links: ResolvedNavLink[];
};

const linkClasses = 'inline-flex items-center gap-1 text-sm font-semibold uppercase hover:text-primary-200';

export const Navbar = ({ links }: NavbarProps): React.ReactNode => {
  return (
    <div className="relative">
      {/* Desktop Main Nav */}
      <nav className="text-white hidden md:flex">
        <ul className="flex flex-wrap gap-x-8 text-white">
          {links.map(({ key, label, href, isExternal, openInNewTab }) => (
            <li key={key} className="flex">
              {isExternal
                ? (
                    <a
                      href={href}
                      target={openInNewTab ? '_blank' : undefined}
                      rel={openInNewTab ? 'noopener noreferrer' : undefined}
                      className={linkClasses}
                    >
                      {label}
                      <HiArrowUpRight aria-hidden="true" className="size-3" />
                    </a>
                  )
                : (
                    <Link
                      href={href}
                      target={openInNewTab ? '_blank' : undefined}
                      rel={openInNewTab ? 'noopener noreferrer' : undefined}
                      className={linkClasses}
                    >
                      {label}
                    </Link>
                  )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
