'use client';
import type { CategorySchema } from '@/libs/sanity/types';
import Loader from '@/components/Loader';
import Typography from '@/components/Typography';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';
import SVG from 'react-inlinesvg';

type Props = {
  categories: CategorySchema[];
  limit?: number;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const CategoryList = ({ categories, limit = 12 }: Props) => {
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const linkRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true, margin: '-100px' });
  const isCardsInView = useInView(cardsRef, { once: true, margin: '-100px' });
  const isLinkInView = useInView(linkRef, { once: true, margin: '-100px' });

  if (!categories.length) {
    return (
      <div className="space-y-6">
        <Typography variant="body">
          Nenhuma categoria foi cadastrada ainda nestes critérios
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        <motion.div
          ref={titleRef}
          className="w-full lg:w-[30%] flex flex-col gap-2"
          variants={container}
          initial="hidden"
          animate={isTitleInView ? 'show' : 'hidden'}
        >
          <motion.div variants={item}>
            <Typography variant="h3" className="text-dark">
              Pesquisar por Categoria
            </Typography>
          </motion.div>
          <motion.div variants={item}>
            <Typography variant="bodySmall" className="text-gray-500">
              Encontre os melhores vitrines para o seu negócio com base em suas categorias.
            </Typography>
          </motion.div>
        </motion.div>
        <motion.div
          ref={cardsRef}
          className="w-full lg:w-[70%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          animate={isCardsInView ? 'show' : 'hidden'}
        >
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-3">
            <motion.div variants={item}>
              <Link href="/vitrines/50-mais" className="group col-span-3 flex items-center shadow-sm p-3 rounded-2xl hover:bg-primary/5 transition-all duration-300 border border-gray-100 w-full">
                <div className="rounded-full p-5 transition-all duration-300">
                  <SVG
                    src="/assets/images/couple.svg"
                    className="h-6 w-6 !fill-primary"
                    loader={<Loader />}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Typography variant="body" className="font-semibold text-dark group-hover:text-darker transition-all duration-300">
                    Soluções 50+
                  </Typography>
                  <Typography variant="bodySmall" className="text-gray-500">
                    Você pode encontrar soluções específicas para pessoas 50+ em nossas categorias.
                  </Typography>
                </div>
              </Link>
            </motion.div>
          </div>

          {categories?.slice(0, limit === -1 ? categories.length : limit)?.map(category => (
            <div key={category._id}>
              <motion.div variants={item}>
                <Link
                  href={`/categoria/${category.slug}`}
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
                      className="font-semibold text-dark group-hover:text-darker transition-all duration-300"
                    >
                      {category.title}
                    </Typography>
                  </div>
                </Link>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
      {limit !== -1 && (
        <motion.div
          ref={linkRef}
          className="flex justify-end"
          variants={item}
          initial="hidden"
          animate={isLinkInView ? 'show' : 'hidden'}
        >
          <Link href="/categorias" className="text-primary-700 hover:underline text-sm">
            Ver Todas
          </Link>
        </motion.div>
      )}
    </div>
  );
};
