'use client';
import type { BrandCategoryOption } from '@/components/BrandRegistrationModal';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { BrandRegistrationModal } from '@/components/BrandRegistrationModal';
import Container from '@/components/Container';
import Typography from '@/components/Typography';

type HeroMedia = {
  type?: 'image' | 'video';
  image?: string;
  videoMp4?: string;
  videoWebm?: string;
  poster?: string;
};

type Props = {
  title: string;
  media?: HeroMedia;
  brandCategories?: BrandCategoryOption[];
  whatsappPhone?: string;
};

const EMPTY_BRAND_CATEGORIES: BrandCategoryOption[] = [];
const FALLBACK_IMAGE = '/assets/images/bg-mall.webp';

const HeroPrimary = ({
  title,
  media,
  brandCategories = EMPTY_BRAND_CATEGORIES,
  whatsappPhone,
}: Props) => {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const mediaType = media?.type ?? 'image';
  const isVideo = mediaType === 'video' && Boolean(media?.videoMp4 || media?.videoWebm);
  // For images: use the configured image. For videos: poster is the cover (required at CMS level).
  const coverImage = isVideo ? media?.poster : media?.image ?? FALLBACK_IMAGE;

  // Defer video mounting until after first paint and only when the user
  // hasn't requested reduced motion. The poster image carries the LCP.
  useEffect(() => {
    if (!isVideo) {
      return;
    }

    const prefersReducedMotion
      = typeof window !== 'undefined'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const idle = (cb: () => void) => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
      if (typeof w.requestIdleCallback === 'function') {
        w.requestIdleCallback(cb);
      } else {
        window.setTimeout(cb, 250);
      }
    };

    idle(() => setShouldRenderVideo(true));
  }, [isVideo]);

  return (
    <section className="relative isolate overflow-hidden flex items-center">
      {/* Cover image — always rendered as the LCP element */}
      {coverImage && (
        <Image
          src={coverImage}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Background video — mounted after first paint, layered above the poster */}
      {isVideo && shouldRenderVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={media?.poster}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          {media?.videoWebm && <source src={media.videoWebm} type="video/webm" />}
          {media?.videoMp4 && <source src={media.videoMp4} type="video/mp4" />}
        </video>
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
              className="text-white text-balance sm:text-3xl! md:text-4xl! xl:text-5xl! tracking-tight! leading-[1.05]!"
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
        className="absolute z-20 sm:bottom-8 sm:right-10 md:w-auto bottom-5 sm:bottom-5 sm:right-5 md:bottom-10 md:right-10 px-4 w-full text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
      >
        <Link
          href="https://agilitycreative.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Em parceria com Agility Creative"
          className="group inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-5 py-2 sm:px-6 sm:py-2.5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/60 group-hover:text-white/90 transition-colors whitespace-nowrap">
            Desenvolvido em Parceria:
          </span>
          <span className="h-auto w-auto bg-white/20" aria-hidden="true" />
          <div className="flex items-center gap-2 justify-center">
            <Image
              src="/assets/images/agility-logo-primary.svg"
              alt="Agility Creative"
              width={80}
              height={80}
              className="h-6 sm:h-5 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <Image
              src="/assets/images/agility-completo-white.svg"
              alt="Agility Creative"
              width={280}
              height={80}
              className="h-4 sm:h-6 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>

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
