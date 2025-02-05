'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Container from './Container';

type HeroProps = {
  background: string | string[];
  title: string;
  description: string;
  logo: string;
  interval?: number;
};

export const StoreHero: React.FC<HeroProps> = ({
  background,
  title,
  description,
  logo,
  interval = 5000,
}) => {
  const [currentBg, setCurrentBg] = useState(
    Array.isArray(background) ? background[0] : background,
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (Array.isArray(background) && background.length > 1) {
      const changeBg = setInterval(() => {
        setCurrentBg((prev) => {
          const nextIndex = (background.indexOf(prev as string) + 1) % background.length;
          setCurrentIndex(nextIndex);
          return background[nextIndex];
        });
      }, interval);

      return () => clearInterval(changeBg);
    }
    return undefined;
  }, [background, interval]);

  return (
    <section
      className="relative flex py-4 justify-center min-h-[30vh] w-full text-white text-center overflow-hidden"
      style={{ backgroundImage: `url(${currentBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10">
        <div className="flex justify-center my-10">
          <Image src={logo} alt="Logo" width={90} height={90} className="light rounded-xl w-24 h-24" />
        </div>
        <Container>
          <h2 className="text-4xl sm:text-5xl font-semibold">
            {title}
          </h2>
          <p className="mt-4 text-sm font-normal max-w-96">
            {description}
          </p>
        </Container>
        {Array.isArray(background) && (
          <div className="mt-16 flex justify-center gap-x-3 sm:gap-x-4">
            {background.map((image, index) => (
              <div
                key={`image-${image}`}
                className={`h-0.5 w-full rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-white' : 'bg-secondary-dark'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
