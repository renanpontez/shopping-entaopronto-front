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
  ;

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        <div className="lg:w-[30%] flex flex-col gap-2">
          <Typography variant="h3" className="text-dark">
            Pesquisar por Categoria
          </Typography>
          {/* add a small subtitle */}
          <Typography variant="bodySmall" className="text-gray-500">
            Encontre os melhores parceiros para o seu negócio com base em suas categorias.
          </Typography>
        </div>
        <div className="lg:w-[70%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ToggleButton label="Categorias com soluções 50+" variant="primary-outlined" onChange={() => setIsFiftyPlus(!isFiftyPlus)} />
          {filteredCategories?.slice(0, limit === -1 ? filteredCategories.length : limit)?.map(category => (
            <Link
              href={`/categoria/${category.slug}`}
              key={category._id}
              className="group flex items-center shadow-sm p-3 rounded-2xl hover:bg-primary/5 transition-all duration-300 border border-gray-100"
            >
              <div className="rounded-full p-5 transition-all duration-300">
                <SVG
                  src={category?.icon}
                  className="h-10 w-10 !fill-primary"
                  loader={<Loader />}
                />
              </div>
              <div>
                <Typography
                  variant="body"
                  className="font-semibold text-dark group-hover:text-primary transition-all duration-300"
                >
                  {category.title}
                </Typography>
                {category.storesCount > 0 && (
                  <Typography
                    variant="caption"
                    className="text-gray-500 mt-2 text-normal"
                  >
                    {category.storesCount}
                    {' '}
                    parceiros
                  </Typography>
                )}
              </div>

            </Link>
          ))}
        </div>
      </div>
      {limit !== -1 && (
        <div className="flex justify-end">
          <Link href="/categorias" className="text-primary hover:underline text-sm">
            Ver Todas
          </Link>
        </div>
      )}
    </div>
  );
};
