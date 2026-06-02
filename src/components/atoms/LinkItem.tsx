import classNames from 'classnames';
import Link from 'next/link';

type LinkItemProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
};

export const LinkItem = ({ href, children, className, target, rel }: LinkItemProps) => {
  const isInternalUrl = href && (href.startsWith('/') || href.startsWith('#'));
  const linkItemBaseStyle = classNames('text-sm hover:font-medium', className);

  if (isInternalUrl) {
    return (
      <Link href={href} className={linkItemBaseStyle} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={linkItemBaseStyle} target={target} rel={rel}>
      {children}
    </a>
  );
};
