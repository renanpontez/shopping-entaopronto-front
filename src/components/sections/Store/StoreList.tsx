'use client';
import type { StoreSchemaResponse } from '@/libs/sanity/types';
import { Input } from '@/components/atoms/Input';
import { SelectInput } from '@/components/SelectInput';
import Typography from '@/components/Typography';
import { getPartnershipDuration } from '@/utils/Helpers';
import { buildStoreUrl } from '@/utils/URLs';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FaRegClock } from 'react-icons/fa';
import SVG from 'react-inlinesvg';

const COMPANY_PLACEHOLDER = '/assets/images/company-placeholder.svg';

type Props = {
  stores: StoreSchemaResponse[];
  limit?: number;
  title?: string;
};

export const StoreList = ({
  stores,
  limit = 12,
  title = 'Parceiros em Destaque',
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get unique categories from stores
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    stores.forEach((store) => {
      store.categories?.forEach((category) => {
        if (category.title) {
          uniqueCategories.add(category.title);
        }
      });
    });
    return Array.from(uniqueCategories);
  }, [stores]);

  // Filter stores based on search and category
  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchesSearch = store.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || store.categories?.some(cat => cat.title === selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [stores, searchTerm, selectedCategory]);

  if (!stores.length) {
    return (
      <div className="space-y-6">
        <Typography variant="body">
          Nenhuma loja foi cadastrada ainda nestes critérios.
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8 pt-10">
      {/* Title and Search Section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-32">
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-2 flex-1">
          <Typography variant="h3" className="text-dark">
            {title}
          </Typography>
          {/* <Typography variant="bodySmall" className="text-gray-500">
            Conheça as marcas que fazem parte do nosso marketplace e descubra produtos e serviços incríveis.
          </Typography> */}
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 flex-2">
          <div className="flex-1">
            <Input.Field
              type="text"
              placeholder="Buscar parceiros..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="h-12"
            />
          </div>
          <div className="w-full md:w-64">
            <SelectInput
              options={[
                { value: '', label: 'Todas as categorias' },
                ...categories.map(cat => ({ value: cat, label: cat })),
              ]}
              selectedOption={selectedCategory}
              onOptionSelected={(value: string) => setSelectedCategory(value)}
              placeholder="Filtrar por categoria"
            />
          </div>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores?.slice(0, limit === -1 ? filteredStores.length : limit).map(store => (
          <Link
            href={buildStoreUrl(store.slug)}
            key={store._id}
            className="group flex gap-7 shadow-sm p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-100"
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
              <Typography variant="h6" className="text-dark group-hover:text-darker transition-all duration-300">
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

      {limit !== -1 && filteredStores.length > limit && (
        <div className="flex justify-end">
          <Link href="/parceiros" className="text-primary hover:underline text-sm">
            Ver Todos
          </Link>
        </div>
      )}
    </div>
  );
};
