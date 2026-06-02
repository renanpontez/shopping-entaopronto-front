import type { ResolvedNavLink } from '@/utils/navigation';
import Link from 'next/link';
import { HiArrowUpRight } from 'react-icons/hi2';

type MainNavProps = {
  links: ResolvedNavLink[];
};

const linkClasses = 'inline-flex items-center gap-1 text-dark text-md font-medium pr-30 pb-2 border-b-1 border-gray-300 focus:font-semibold';

export const MainNav = ({ links }: MainNavProps) => {
  return (
    <nav className="flex flex-col items-top justify-left h-full gap-4 py-4 mt-4">
      {links.map(({ key, label, href, isExternal, openInNewTab }) =>
        isExternal
          ? (
              <a
                key={key}
                href={href}
                target={openInNewTab ? '_blank' : undefined}
                rel={openInNewTab ? 'noopener noreferrer' : undefined}
                className={linkClasses}
              >
                {label}
                <HiArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            )
          : (
              <Link
                key={key}
                href={href}
                target={openInNewTab ? '_blank' : undefined}
                rel={openInNewTab ? 'noopener noreferrer' : undefined}
                className={linkClasses}
              >
                {label}
              </Link>
            ),
      )}
    </nav>
  );
};
