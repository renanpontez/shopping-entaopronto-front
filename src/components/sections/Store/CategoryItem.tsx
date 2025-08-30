'use client';

import Typography from '@/components/Typography';
import { buildCategoryUrl } from '@/utils/URLs';
import classNames from 'classnames';
import Link from 'next/link';
import { FaFolderOpen } from 'react-icons/fa';
import SVG from 'react-inlinesvg';

type Props = {
  category: any;
  currentCategory?: string;
  isMobile?: boolean;
  onClick?: () => void;
};

export const CategoryItem = ({ category, currentCategory, isMobile = false, onClick }: Props) => {
  const isActive = currentCategory === category.slug;

  if (category.slug === 'vitrines') {
    return (
      <Link
        href="/vitrines"
        className={classNames(
          'flex items-center gap-2 py-2 w-full border-t border-gray-200 pt-5',
          isMobile && 'pt-3 border-t border-gray-200',
        )}
        onClick={onClick}
      >
        <FaFolderOpen className="!w-4 h-4 !fill-primary" />
        <Typography variant="h6" className="text-dark text-sm group-hover:text-darker transition-all duration-300 flex items-center gap-2">
          Todas as Vitrines
        </Typography>
      </Link>
    );
  }

  return (
    <Link
      href={buildCategoryUrl(category.slug)}
      className={classNames(
        'flex items-center gap-2 py-2 w-full transition-all duration-300',
        isActive && 'border-l-5 border-primary pl-2',
        isMobile && 'gap-3 py-2 px-3 rounded-md transition-colors',
        isMobile && isActive && 'bg-primary/10 text-primary border-l-4 border-primary',
        isMobile && !isActive && 'hover:bg-gray-50',
      )}
      onClick={onClick}
    >
      <div className={classNames(
        'flex items-center gap-2',
        isMobile && 'gap-3',
      )}
      >
        {category.icon && (
          <SVG src={category.icon} className="!w-5 h-5 !fill-primary flex-shrink-0" />
        )}
        <div className={classNames(
          'flex items-center gap-2',
          isMobile && 'flex-1 min-w-0',
        )}
        >
          <Typography
            variant="h6"
            className={classNames(
              'text-dark text-sm group-hover:text-darker transition-all duration-300 flex items-center gap-2',
              isMobile && 'text-dark font-medium truncate',
            )}
          >
            {category.title}
            {!isMobile && (
              <>
                {' '}
                <Typography variant="bodySmall" tag="span" className="text-gray-500 text-sm">
                  (
                  {category.storesCount}
                  )
                </Typography>
              </>
            )}
          </Typography>
          {isMobile && (
            <Typography variant="bodySmall" className="text-gray-500 text-xs">
              (
              {category.storesCount}
              )
            </Typography>
          )}
        </div>
      </div>
    </Link>
  );
};
