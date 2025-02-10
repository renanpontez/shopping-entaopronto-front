import type { CategorySchema } from '@/libs/sanity/types';
import Loader from '@/components/Loader';
import Typography from '@/components/Typography';
import Link from 'next/link';
import SVG from 'react-inlinesvg';

type Props = {
  categories: CategorySchema[];
};

export const CategoryList = ({ categories }: Props) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8 justify-around w-full">
      {categories.concat(categories.concat(categories.concat(categories))).map(category => (
        <li key={category._id + new Date().toISOString() + Math.random()}>
          <Link href={`/categoria/${category.slug}`} className="flex flex-row gap-5 items-center hover:border-primary border border-transparent pr-4 rounded-lg">
            <div className="bg-primary text-white p-4 rounded-lg aspect-square">
              <SVG src={category?.icon?.svg} fontSize={36} style={{ margin: 'auto 0' }} loader={<Loader />} />
            </div>
            <div className="flex flex-col gap-0">
              <Typography variant="h5">{category.title}</Typography>
              {category.subCategories?.length && (
                <Typography variant="body" tag="span">
                  {category.subCategories?.length}
                  {' '}
                  sub-categorias
                </Typography>
              )}
              {!Number.isNaN(category.storesCount) && (
                <Typography variant="body" tag="span">
                  {category.storesCount}
                  {' '}
                  parceiros
                </Typography>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
