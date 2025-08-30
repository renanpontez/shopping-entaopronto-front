'use client';

import Typography from '@/components/Typography';
import { CategoryItem } from './CategoryItem';

type Props = {
  categories: any[];
  currentCategory?: string;
  pathname: string;
};

export const CategorySidebar = ({ categories, currentCategory, pathname }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h5" className="text-dark group-hover:text-darker transition-all duration-300 border-b border-gray-200 pb-2">
        Categorias
      </Typography>
      <div className="flex flex-col gap-4">
        {categories?.map(category => (
          <CategoryItem
            key={category.slug}
            category={category}
            currentCategory={currentCategory}
            isMobile={false}
          />
        ))}
        {pathname !== '/vitrines' && (
          <CategoryItem
            category={{ slug: 'vitrines', title: 'Todas as Vitrines' }}
            currentCategory={currentCategory}
            isMobile={false}
          />
        )}
      </div>
    </div>
  );
};
