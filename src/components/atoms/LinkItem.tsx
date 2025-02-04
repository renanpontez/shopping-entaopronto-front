import classNames from 'classnames';
import Link from 'next/link';

type LinkItemProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const LinkItem = ({ href, children, className }: LinkItemProps) => {
  const isInternalUrl = href && (href.startsWith('/') || href.startsWith('#'));
  const Tag = isInternalUrl ? Link : 'a';

  const linkItemBaseStyle = classNames('text-sm hover:font-medium', className);
  return (
    <Tag href={href} className={classNames(linkItemBaseStyle)}>
      {children}
    </Tag>
  );
};
