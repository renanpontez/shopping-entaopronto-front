'use client';

import { Button } from '@/components/atoms/Button';
import Typography from '@/components/Typography';
import classNames from 'classnames';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { CategoryItem } from './CategoryItem';

type Props = {
  categories: any[];
  currentCategory?: string;
  pathname: string;
};

export const CategoryDropdown = ({ categories, currentCategory, pathname }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:hidden">
      <Button
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        className="w-full"
        aria-haspopup="true"
        variant="grey-outlined"
      >
        <div className="flex items-center gap-2 w-full justify-between">
          <Typography variant="h6" className="text-dark font-semibold">
            Categorias
          </Typography>
          <FaChevronDown
            className={classNames(
              'text-gray-500 transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        </div>

      </Button>

      {isOpen && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 space-y-3">
            {categories?.map(category => (
              <CategoryItem
                key={category.slug}
                category={category}
                currentCategory={currentCategory}
                isMobile
                onClick={() => setIsOpen(false)}
              />
            ))}

            {pathname !== '/vitrines' && (
              <div className="pt-3 border-t border-gray-200">
                <CategoryItem
                  category={{ slug: 'vitrines', title: 'Todas as Vitrines' }}
                  currentCategory={currentCategory}
                  isMobile
                  onClick={() => setIsOpen(false)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
