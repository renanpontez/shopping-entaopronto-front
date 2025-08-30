'use client';
import type { StoreSchemaResponse } from '@/libs/sanity/types';
import { searchStoresAction } from '@/app/actions/search';
import { Input } from '@/components/atoms/Input';
import Typography from '@/components/Typography';
import { buildStoreUrl } from '@/utils/URLs';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryDropdown } from './CategoryDropdown';
import { CategorySidebar } from './CategorySidebar';
import 'placeholder-loading/dist/css/placeholder-loading.min.css';

const COMPANY_PLACEHOLDER = '/assets/images/company-placeholder.svg';

type Props = {
  stores: StoreSchemaResponse[];
  categories: any[];
  limit?: number;
  title?: string;
  showCategories?: boolean;
  currentCategory?: string;
};

export const StoreList = ({
  stores,
  categories,
  limit = 12,
  title,
  showCategories = true,
  currentCategory,
}: Props) => {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<StoreSchemaResponse[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search function using useCallback and useRef for cleanup
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout | null = null;

      return (value: string) => {
        // Clear previous timeout
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // If search is empty, reset immediately
        if (!value.trim()) {
          setSearchResults([]);
          setHasSearched(false);
          return;
        }

        // Set timeout for debounced search
        timeoutId = setTimeout(async () => {
          setHasSearched(true);
          try {
            const results = await searchStoresAction(value);
            setSearchResults(results);
          } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
          } finally {
            setIsPending(false);
          }
        }, 500); // Increased to 500ms for better UX
      };
    })(),
    [],
  );

  // Update search term and trigger debounced search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setIsPending(true);
    debouncedSearch(value);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      // This will run on unmount, but we don't need to store timeoutId in ref
      // as it's handled within the closure
    };
  }, []);

  const displayStores = searchTerm.trim() ? searchResults : stores;
  const filteredStores = useMemo(() => {
    return displayStores.filter((store) => {
      const matchesCategory = !currentCategory || store.categories?.some(cat => cat.slug === currentCategory);
      return matchesCategory;
    });
  }, [displayStores, currentCategory]);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Title and Search Section */}
      <div className="flex flex-col gap-8">
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-2 flex-1">
          {title && (
            <Typography variant="h3" className="text-dark">
              {title}
            </Typography>
          )}
          {/* <Typography variant="bodySmall" className="text-gray-500">
            Conheça as marcas que fazem parte do nosso marketplace e descubra produtos e serviços incríveis.
          </Typography> */}
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row flex-2">
          <div className="flex-1 relative">
            <Input.Field
              type="text"
              placeholder="Buscar vitrines..."
              value={searchTerm}
              onChange={e => handleSearch(e.target.value)}
              className="h-12"
            />
            {isPending && searchTerm.trim() && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar categories */}
        {showCategories && (
          <>
            {/* Desktop sidebar */}
            <div className="flex-col gap-4 w-full md:w-1/4 pr-16 lg:flex hidden">
              <CategorySidebar
                categories={categories}
                currentCategory={currentCategory}
                pathname={pathname}
              />
            </div>

            {/* Mobile dropdown */}
            <div className="lg:hidden">
              <CategoryDropdown
                categories={categories}
                currentCategory={currentCategory}
                pathname={pathname}
              />
            </div>
          </>
        )}

        {/* Stores Grid */}
        <div className={classNames(
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-min w-full lg:w-3/4',
          showCategories ? 'lg:w-3/4' : 'w-full',
        )}
        >
          {/* Loading skeleton */}
          {isPending && searchTerm.trim() && (
            <>
              {Array.from({ length: 16 }).map((_, index) => (
                <div key={`skeleton-${index}`} className="ph-item shadow-xs p-3! rounded-xl! hover:bg-gray-50! border! border-gray-200! w-full">
                  <div className="ph-col-12 p-0!">
                    <div className="ph-picture w-20! h-14! mt-2! mx-auto mb-4!"></div>
                    <div className="ph-row">
                      <div className="ph-col-2 empty"></div>
                      <div className="ph-col-8"></div>
                      <div className="ph-col-12 empty"></div>
                      <div className="ph-col-12 opacity-50!"></div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Actual stores */}
          {!isPending && filteredStores?.length > 0 && filteredStores?.slice(0, limit === -1 ? filteredStores.length : limit).map(store => (
            <Link
              href={buildStoreUrl(store.slug)}
              key={store._id}
              className="flex flex-col gap-5 shadow-xs p-3 rounded-xl hover:bg-gray-50 border border-gray-200 w-full h-full justify-between"
            >
              <div className="relative flex-shrink-0 bg-white">
                <Image
                  src={store.logo ?? COMPANY_PLACEHOLDER}
                  alt={store.title}
                  width={50}
                  height={60}
                  className="border mx-auto object-contain h-[5rem] w-auto aspect-square rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="h6" className="text-dark group-hover:text-darker transition-all duration-300 line-clamp-1 text-center text-ellipsis overflow-hidden text-sm font-semibold">
                  {store.title}
                </Typography>
                <div className="flex flex-col gap-1 w-full text-center">
                  {store?.categories?.[0] && (
                    <Typography variant="bodySmall" className="text-xs font-medium text-gray">
                      {store.categories[0].title}

                    </Typography>
                  )}
                </div>
              </div>
            </Link>
          ))}

          {/* No results message */}
          {!isPending && hasSearched && searchTerm.trim() && !filteredStores?.length && (
            <div className="col-span-full text-center py-12">
              <Typography variant="body" className="text-gray-500 mb-2">
                Nenhuma loja encontrada
              </Typography>
              <Typography variant="bodySmall" className="text-gray-400">
                Tente ajustar os termos de busca ou categoria
              </Typography>
            </div>
          )}
          {/* No stores in category message */}
          {!isPending && !searchTerm.trim() && !filteredStores.length && (
            <div className="flex flex-col gap-2 w-full space-y-4 col-span-full">
              <Typography variant="body" className="text-gray-500 mb-2 w-full">
                Nenhuma loja foi cadastrada ainda nesta categoria.
              </Typography>
              <Link href="/vitrines" className="text-primary-600 font-semibold hover:underline text-sm">
                Todas as Vitrines
              </Link>
            </div>
          )}
        </div>

      </div>
      {limit !== -1 && filteredStores.length > limit && (
        <div className="flex justify-end">
          <Link href="/vitrines" className="text-primary-600 font-semibold hover:underline text-sm">
            Todas as Vitrines
          </Link>
        </div>
      )}
    </div>
  );
};
