'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Button } from '../Button';

type Props = {
  mainNav: React.ReactNode;
};

export const MobileNavbar = ({ mainNav }: Props) => {
  const navbarWrapperRef = useRef<HTMLDivElement>(null);
  const navbarToggleRef = useRef<HTMLDivElement>(null);

  const [isOpened, setIsOpened] = useState(false);
  const handleMenuToggle = () => {
    if (!isOpened) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }

    setIsOpened(!isOpened);
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (!navbarWrapperRef.current?.contains(event.target as Node) && !navbarToggleRef.current?.contains(event.target as Node)) {
        setIsOpened(false);
        document.body.classList.remove('overflow-y-hidden');
      }
    };
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="md:hidden text-dark">
      <div ref={navbarToggleRef}>
        <Button variant="link" onClick={handleMenuToggle} className="pr-0!">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </Button>
      </div>

      <div className={classNames('fixed top-0 right-0', {
        block: isOpened,
        hidden: !isOpened,
      })}
      >
        <div className="backdrop bg-backdrop size-full z-10 left-0 top-0 fixed" />
        <div className="relative bg-white z-50 h-screen p-6 w-[80vw]" ref={navbarWrapperRef}>
          <div className="relative w-full mt-1 mb-3 flex flex-row justify-between items-center">
            <Image
              src="/assets/images/entao-pronto-logo.svg"
              alt="Logo"
              layout="intrinsic"
              width={200}
              height={64}
              className="h-full w-auto"
            />

            <Button variant="link" onClick={handleMenuToggle} className="pr-0!">
              <FaTimes />
            </Button>
          </div>
          {mainNav}
        </div>
      </div>
    </div>
  );
};
