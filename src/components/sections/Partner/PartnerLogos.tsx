'use client';

import type { StoreSchemaResponse } from '@/libs/sanity/types';
import Typography from '@/components/Typography';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

const COMPANY_PLACEHOLDER = '/assets/images/company-placeholder.svg';

type Props = {
  stores: StoreSchemaResponse[];
};

const PartnerLogos = ({ stores }: Props) => {
  if (!stores.length) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-32 py-4"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 50,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {/* First set of logos */}
          {stores.map((store, index) => (
            <motion.div
              key={`${store._id}-${index}`}
              whileHover={{ scale: 1.1 }}
              className="flex-shrink-0"
            >
              <Link
                href={`/parceiro/${store.slug}`}
                className="group flex items-center justify-center py-4 transition-all duration-300 flex-col gap-1"
              >
                <Image
                  src={store.logo ?? COMPANY_PLACEHOLDER}
                  alt={store.title}
                  width={120}
                  height={120}
                  className="w-12 h-12 rounded-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                <Typography variant="extraSmall" tag="p" className="text-dark text-center max-w-24">
                  {store.title}
                </Typography>
              </Link>
            </motion.div>
          ))}
          {/* Second set of logos for seamless loop */}
          {stores.map((store, index) => (
            <motion.div
              key={`${store._id}-${index}-duplicate`}
              whileHover={{ scale: 1.1 }}
              className="flex-shrink-0"
            >
              <Link
                href={`/parceiro/${store.slug}`}
                className="group flex items-center justify-center py-4 transition-all duration-300 flex-col gap-1"
              >
                <Image
                  src={store.logo ?? COMPANY_PLACEHOLDER}
                  alt={store.title}
                  width={120}
                  height={120}
                  className="w-12 h-12 rounded-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                <Typography variant="extraSmall" tag="p" className="text-dark text-center max-w-24">
                  {store.title}
                </Typography>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerLogos;
