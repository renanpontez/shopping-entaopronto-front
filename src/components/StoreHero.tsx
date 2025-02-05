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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (Array.isArray(background) && background.length > 1) {
      const changeBg = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % background.length);
      }, interval);

      return () => clearInterval(changeBg);
    }
    return undefined;
  }, [background, interval]);

  const currentBg = Array.isArray(background) ? background[currentIndex] : background;

  return (
    <div
      className="relative flex py-4 flex-col justify-center min-h-[30vh] w-full text-white text-center overflow-hidden"
      style={{ backgroundImage: `url(${currentBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10">
        <div className="flex justify-center my-10">
          <Image src={logo} alt="Logo" width={90} height={90} className="light rounded-xl w-24 h-24" />
        </div>
        <Container className="flex flex-col gap-4 pb-1 items-center">
          <h2 className="text-4xl sm:text-5xl font-semibold">
            {title}
          </h2>
          <p className=" text-sm font-normal max-w-[400px] text-center">
            {description}
          </p>
          {Array.isArray(background) && (
            <div className="mt-16 w-full flex justify-center gap-x-5 sm:gap-x-6">
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
        </Container>

      </div>
    </div>
  );
};
