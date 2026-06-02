import type { ResolvedNavLink } from '@/utils/navigation';
import Link from 'next/link';

type MainNavProps = {
  links: ResolvedNavLink[];
};

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
                className="text-dark text-md font-medium pr-30 pb-2 border-b-1 border-gray-300 focus:font-semibold"
              >
                {label}
              </a>
            )
          : (
              <Link
                key={key}
                href={href}
                target={openInNewTab ? '_blank' : undefined}
                rel={openInNewTab ? 'noopener noreferrer' : undefined}
                className="text-dark text-md font-medium pr-30 pb-2 border-b-1 border-gray-300 focus:font-semibold"
              >
                {label}
              </Link>
            ),
      )}
    </nav>
  );
};
