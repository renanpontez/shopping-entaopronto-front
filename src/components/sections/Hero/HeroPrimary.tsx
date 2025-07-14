'use client';
import { Button } from '@/components/atoms/Button';
import Container from '@/components/Container';
import Typography from '@/components/Typography';
import { motion } from 'motion/react';
import Image from 'next/image';

type Props = {
  title: string;
  videoUrl?: string;
  imageUrl?: string;
};

const HeroPrimary = ({ title, videoUrl = '/assets/images/test.mp4', imageUrl = '/assets/images/bg-mall.webp' }: Props) => (
  <div className="relative py-24 overflow-hidden pt-32">
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
        alt="Hero"
        fill
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
    )}
    <div className="absolute inset-0 bg-black/70 z-10" />
    <div className="relative z-20">
      <Container>
        <div className="flex flex-col md:flex-row py-10 md:py-20 gap-15 lg:gap-20 items-center">
          <motion.div
            className="flex flex-col gap-8 w-full md:w-4/5 lg:w-1/2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              <Typography variant="h1" className="text-white">{title}</Typography>
            </motion.div>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            >
              <Typography variant="body" className="text-white">
                Seus clientes estão navegando e você pode aumentar a exposição da sua marca com o Shopping EntãoPronto. Conheça já!
              </Typography>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row gap-5 w-full"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
            >
              <Button href="#Parceiros" variant="white" type="link">
                Conhecer parceiros
              </Button>
              <Button href="/contato" variant="white-outlined">
                Cadastre sua marca
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  </div>
);

export default HeroPrimary;
