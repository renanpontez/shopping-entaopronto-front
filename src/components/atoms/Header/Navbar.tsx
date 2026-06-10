import type { ResolvedNavLink } from '@/utils/navigation';
import Link from 'next/link';
import { HiArrowUpRight } from 'react-icons/hi2';

type NavbarProps = {
  links: ResolvedNavLink[];
};

const linkClasses = [
  'relative inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide',
  'text-white/90 hover:text-white transition-colors duration-200',
  'after:content-[\'\'] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0',
  'after:bg-white/80 after:transition-all after:duration-300 hover:after:w-full',
].join(' ');

export const Navbar = ({ links }: NavbarProps): React.ReactNode => {
  return (
    <div className="relative">
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
                      <HiArrowUpRight aria-hidden="true" className="size-3 opacity-70 group-hover:opacity-100" />
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
