'use client';
import type { BrandCategoryOption } from '@/components/BrandRegistrationModal';
import { Button } from '@/components/atoms/Button';
import { BrandRegistrationModal } from '@/components/BrandRegistrationModal';
import Container from '@/components/Container';
import Typography from '@/components/Typography';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  title: string;
  videoUrl?: string;
  imageUrl?: string;
  brandCategories?: BrandCategoryOption[];
  whatsappPhone?: string;
};

const EMPTY_BRAND_CATEGORIES: BrandCategoryOption[] = [];

const HeroPrimary = ({
  title,
  videoUrl = '/assets/images/test.mp4',
  imageUrl = '/assets/images/bg-mall.webp',
  brandCategories = EMPTY_BRAND_CATEGORIES,
  whatsappPhone,
}: Props) => {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  return (
    <section className="relative isolate overflow-hidden min-h-[88vh] flex items-center">
      {/* Background media */}
      {videoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          aria-hidden="true"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/65 to-black/85" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_60%_60%_at_15%_20%,rgba(255,145,0,0.18),transparent_70%)]" />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(110deg,rgba(0,0,0,0.45)_0%,transparent_55%)]" />

      {/* Content */}
      <Container className="relative z-20 w-full pt-36 pb-28 md:pt-40 md:pb-36">
        <motion.div
          className="flex flex-col gap-7 sm:gap-8 w-full md:w-4/5 lg:w-2/3 xl:w-7/12"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* EntãoPronto logo */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="self-start"
          >
            <Link href="#" aria-label="Shopping EntãoPronto">
              <Image
                src="/assets/images/entao-pronto-logo-white.svg"
                alt="Shopping EntãoPronto"
                width={350}
                height={100}
                className="h-12 sm:h-14 md:h-16 w-auto drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]"
                priority
              />
            </Link>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
          >
            <span className="h-px w-10 bg-primary" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Marketplace colaborativo
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
          >
            <Typography
              variant="h1"
              className="text-white text-balance sm:text-5xl! md:text-6xl! xl:text-7xl! tracking-tight! leading-[1.05]!"
            >
              {title}
            </Typography>
          </motion.div>

          {/* Subhead */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
          >
            <Typography
              variant="body"
              className="text-white/80 max-w-xl text-base sm:text-lg"
            >
              Seus clientes estão navegando e você pode aumentar a exposição da sua marca com o Shopping EntãoPronto. Conheça já!
            </Typography>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.65 }}
          >
            <Button href="#Vitrines" variant="white" type="link">
              Conhecer vitrines
            </Button>
            <Button
              variant="white-outlined"
              type="button"
              onClick={() => setIsBrandModalOpen(true)}
            >
              Cadastre sua marca
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Partner credit — bottom right */}
      <motion.div
        className="absolute z-20 bottom-6 right-6 sm:bottom-8 sm:right-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
      >
        <Link
          href="https://agilitycreative.com.br"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Em parceria com Agility Creative"
          className="group inline-flex items-center gap-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-3.5 py-2 sm:px-4 sm:py-2.5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/60 group-hover:text-white/90 transition-colors whitespace-nowrap">
            Em parceria com
          </span>
          <span className="h-4 w-px bg-white/20" aria-hidden="true" />
          <Image
            src="/assets/images/agility-completo-white.svg"
            alt="Agility Creative"
            width={197}
            height={56}
            className="h-4 sm:h-5 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </Link>
      </motion.div>

      <BrandRegistrationModal
        open={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        categories={brandCategories}
        whatsappPhone={whatsappPhone}
      />
    </section>
  );
};

export default HeroPrimary;
