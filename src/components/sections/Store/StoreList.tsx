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
};

export const StoreList = ({ stores, limit }: Props) => {
  if (!stores.length) {
    return (
      <Typography variant="body">
        Nenhuma loja foi cadastrada ainda nestes critérios.
      </Typography>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {stores?.slice(0, limit).map(store => (
        <li key={store._id} className="shadow-md rounded-lg hover:shadow-lg">
          <Link href={buildStoreUrl(store.slug)}>
            <div className="bg-[url(/assets/images/background-texture.svg)] bg-cover w-full relative py-8 rounded-t-lg items-center flex">
              <div className="size-24 relative mx-auto">
                <Image
                  src={store.logo ?? COMPANY_PLACEHOLDER}
                  alt={store.title}
                  fill
                  objectFit="cover"
                  className="rounded-full shadow-sm border-2 border-primary-700"
                />
              </div>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <Typography variant="h5">
                {store.title}
              </Typography>
              <div className="flex flex-col gap-1">
                {store?.categories?.map(category => (
                  <div key={category._id} className="flex flex-row gap-2 items-center">
                    {category?.icon && (
                      <SVG src={category.icon} fontSize={16} className="text-primary-600 w-6 max-w-6" />
                    )}
                    <Typography variant="body">
                      {category.title}
                    </Typography>
                  </div>
                ))}
                <div className="flex flex-row gap-2 items-center">
                  <FaRegClock size="16" className="text-primary-600 w-6" />
                  <Typography variant="body">
                    {getPartnershipDuration(store._createdAt)}
                  </Typography>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
