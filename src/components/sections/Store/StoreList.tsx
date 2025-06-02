import type { StoreSchemaResponse } from '@/libs/sanity/types';
import Typography from '@/components/Typography';
import { getPartnershipDuration } from '@/utils/Helpers';
import { buildStoreUrl } from '@/utils/URLs';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegClock } from 'react-icons/fa';
import SVG from 'react-inlinesvg';

const COMPANY_PLACEHOLDER = '/assets/images/company-placeholder.svg';

type Props = {
  stores: StoreSchemaResponse[];
  limit?: number;
  title?: string;
  hideSidebar?: boolean;
  cols?: 2 | 3 | 4;
};

export const StoreList = ({
  stores,
  limit = 6,
  title = 'Parceiros em Destaque',
  hideSidebar = false,
  cols = 2,
}: Props) => {
  if (!stores.length) {
    return (
      <Typography variant="body">
        Nenhuma loja foi cadastrada ainda nestes critérios.
      </Typography>
    );
  }

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        {!hideSidebar && (
          <div className="lg:w-[30%] flex flex-col gap-2">
            <Typography variant="h3" className="text-dark">
              {title}
            </Typography>
            <Typography variant="bodySmall" className="text-gray-500">
              Conheça as marcas que fazem parte do nosso marketplace e descubra produtos e serviços incríveis.
            </Typography>
          </div>
        )}
        <div className={`${hideSidebar ? 'w-full' : 'lg:w-[70%]'} grid ${gridCols[cols]} gap-6`}>
          {stores?.slice(0, limit === -1 ? stores.length : limit + 1).map(store => (
            <Link
              href={buildStoreUrl(store.slug)}
              key={store._id}
              className="group flex gap-7 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-100"
            >
              <div className="relative flex-shrink-0">
                <Image
                  src={store.logo ?? COMPANY_PLACEHOLDER}
                  alt={store.title}
                  width={64}
                  height={64}
                  className="border shadow-sm rounded-full object-cover h-auto w-full aspect-square"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Typography variant="h6" className="text-dark group-hover:text-primary transition-all duration-300">
                  {store.title}
                </Typography>
                <div className="flex flex-col gap-1">
                  {store?.categories?.[0] && (
                    <div className="flex items-center gap-3 text-gray-600">
                      {store.categories[0]?.icon && (
                        <SVG src={store.categories[0].icon} className="!w-5 h-5 !fill-primary" />
                      )}
                      <Typography variant="caption">
                        {store.categories[0].title}
                      </Typography>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="flex items-start p-1">
                      <FaRegClock size="14" className="text-primary" />
                    </div>
                    <Typography variant="caption">
                      {getPartnershipDuration(store._createdAt)}
                    </Typography>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {limit !== -1 && (
        <div className="flex justify-end">
          <Link href="/parceiros" className="text-primary hover:underline text-sm">
            Ver Todos
          </Link>
        </div>
      )}
    </div>
  );
};
