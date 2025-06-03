'use client';

import type { StoreSchemaResponse } from '@/libs/sanity/types';
import { motion, useAnimate } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const COMPANY_PLACEHOLDER = '/assets/images/company-placeholder.svg';

type Props = {
  stores: StoreSchemaResponse[];
  limit?: number;
};

const PartnerLogos = ({ stores, limit = 4 }: Props) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      scope.current,
      { x: [0, -100 * stores.length] },
      {
        duration: 50,
        repeat: Infinity,
        ease: 'linear',
      },
    );
  }, [stores.length]);

  if (!stores.length) {
    return null;
  }

  // Duplicate the stores array to create a seamless loop
  const duplicatedStores = [...stores, ...stores, ...stores];

  return (
    <div className="w-full py-8 bg-gray-50">
      <div className="overflow-hidden">
        <motion.div
          ref={scope}
          className="flex gap-32 py-4"
          style={{
            width: 'fit-content',
          }}
        >
          {duplicatedStores.slice(0, limit).map((store, index) => (
            <motion.div
              key={`${store._id}-${index}`}
              whileHover={{ scale: 1.1 }}
              className="flex-shrink-0 gap-10"
            >
              <Link
                href={`/parceiro/${store.slug}`}
                className="group flex items-center justify-center py-4 bg-white rounded-xl transition-all duration-300 rounded-full"
              >
                <Image
                  src={store.logo ?? COMPANY_PLACEHOLDER}
                  alt={store.title}
                  width={120}
                  height={120}
                  className="w-12 h-12 rounded-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerLogos;
