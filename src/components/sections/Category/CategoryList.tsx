'use client';
import type { CategorySchema } from '@/libs/sanity/types';
import Loader from '@/components/Loader';
import Typography from '@/components/Typography';
import Link from 'next/link';
import SVG from 'react-inlinesvg';

type Props = {
  categories: CategorySchema[];
  limit?: number;
};

export const CategoryList = ({ categories, limit = 12 }: Props) => {
  if (!categories.length) {
    return (
      <div className="space-y-6">
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
          <Link href="/parceiros/50-mais" className="group col-span-3 flex items-center shadow-sm p-3 rounded-2xl hover:bg-primary/5 transition-all duration-300 border border-gray-100 w-full">
            <div className="rounded-full p-5 transition-all duration-300">
              <SVG
                src="/assets/images/couple.svg"
                className="h-6 w-6 !fill-primary"
                loader={<Loader />}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Typography variant="body" className="font-semibold text-dark group-hover:text-primary transition-all duration-300">
                Soluções 50+
              </Typography>
              <Typography variant="bodySmall" className="text-gray-500">
                Você pode encontrar soluções específicas para pessoas 50+ em nossas categorias.
              </Typography>
            </div>

          </Link>
          {categories?.slice(0, limit === -1 ? categories.length : limit)?.map(category => (
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
