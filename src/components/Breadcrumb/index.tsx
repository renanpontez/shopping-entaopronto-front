import Link from 'next/link';
import Script from 'next/script';
import Typography from '../Typography';

type BreadcrumbItem = {
  label: string;
  href: string;
};

type Props = {
  breadcrumbs: BreadcrumbItem[];
};

export const Breadcrumb = ({ breadcrumbs }: Props) => {
  if (!breadcrumbs.length) {
    return null;
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': breadcrumb.label,
      'item': breadcrumb.href,
    })),
  };

  return (
    <>
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.href} className="flex items-center gap-2">
            <Link href={breadcrumb.href}>
              <Typography
                variant="bodySmall"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {breadcrumb.label}
              </Typography>
            </Link>
            {index < breadcrumbs.length - 1 && (
              <span className="text-gray-400" aria-hidden="true">
                ›
              </span>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};
