'use client';
import type { CategorySchema } from '@/libs/sanity/types';
import { ToggleButton } from '@/components/atoms/ToggleButton';
import Loader from '@/components/Loader';
import Typography from '@/components/Typography';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import SVG from 'react-inlinesvg';

type Props = {
  categories: CategorySchema[];
  limit?: number;
};

export const CategoryList = ({ categories, limit = 12 }: Props) => {
  const [isFiftyPlus, setIsFiftyPlus] = useState(false);

  const filteredCategories = useMemo(() => {
    if (!isFiftyPlus) {
      return categories;
    }

    return categories.filter(category => category.stores.filter(store => store.solution && store.solution.some(solution => solution.fiftyPlus === true)).length > 0);
  }, [categories, isFiftyPlus]);

  if (!filteredCategories.length) {
    return (
      <div className="space-y-6">
        <ToggleButton label="Categorias com soluções 50+" variant="primary-outlined" onChange={() => setIsFiftyPlus(!isFiftyPlus)} />

        <Typography variant="body">
          Nenhuma categoria foi cadastrada ainda nestes critérios
        </Typography>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToggleButton label="Categorias com soluções 50+" variant="primary-outlined" onChange={() => setIsFiftyPlus(!isFiftyPlus)} />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-8 justify-around w-full">
        {filteredCategories?.slice(0, limit)?.map(category => (
          <li key={category._id}>
            <Link href={`/categoria/${category.slug}`} className="flex flex-row gap-5 items-center hover:border-primary border border-transparent pr-4 rounded-lg">
              <div className="bg-primary text-white p-4 rounded-lg">
                <SVG src={category?.icon} className="mx-auto !h-8 aspect-square !w-auto" loader={<Loader />} />
              </div>
              <div className="flex flex-col gap-0">
                <Typography variant="h5">{category.title}</Typography>
                {category.subCategories?.length && (
                  <Typography variant="bodySmall" tag="span">
                    {category.subCategories?.length}
                    {' '}
                    sub-categoria(s)
                  </Typography>
                )}
                {!Number.isNaN(category.storesCount) && (
                  <Typography variant="caption" tag="span">
                    {category.storesCount}
                    {' '}
                    parceiro(s)
                  </Typography>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
};
