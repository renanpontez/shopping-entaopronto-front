'use client';

import { formatCurrency } from '@/utils/formatCurrencyBRL';
import { getStoreWhatsAppMessage, openWhatsAppChat } from '@/utils/Whatsapp';
import Image from 'next/image';
import SVG from 'react-inlinesvg';
import { Button } from './atoms/Button';
import Loader from './Loader';
import Typography from './Typography';

type SolutionProps = {
  name: string;
  storeName: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
  whatsappContact: string;
  fiftyPlus: boolean;
};

export const SolutionCard = ({ name, description, price, image, discount, whatsappContact, storeName, fiftyPlus }: SolutionProps) => {
  const formattedPrice = formatCurrency(price);
  const whatsAppMessage = getStoreWhatsAppMessage(storeName, name, description, formattedPrice);
  const handleContactStore = () => openWhatsAppChat(whatsappContact, whatsAppMessage);

  return (
    <div className="flex flex-col w-full gap-3">
      {image && (
        <div className="relative">
          <Image
            src={image}
            className="rounded-lg max-h-96 object-cover w-full"
            alt={`Product: ${name} image`}
            width={382}
            height={269}
          />
          {fiftyPlus && (
            <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-lg flex items-center gap-2">
              <SVG
                src="/assets/images/couple.svg"
                className="h-4 w-4 !fill-white"
                loader={<Loader />}
              />
              <Typography variant="bodySmall" tag="p" className="text-white">Solução 50+</Typography>
            </div>
          )}
        </div>
      )}
      <Typography variant="h4" className="pt-3 text-dark">
        {name}
      </Typography>
      <Typography variant="bodySmall" tag="p" className=" text-secondary">{description}</Typography>
      <div className="flex flex-wrap gap-2 mt-6 justify-between items-end">
        <div>
          {/* TODO: REMOVE THIS WHEN DISCOUNT IS AVAIBLE ON SANITY RESPONSE */}
          {discount && (
            <span className="text-xs font-light line-through">
              {formatCurrency(discount)}
            </span>
          )}
          <Typography variant="bodySmall" tag="p" className="italic">a partir de</Typography>
          <span className="text-2xl font-medium">
            {formattedPrice}
          </span>
        </div>
        <Button variant="primary" onClick={handleContactStore}>Quero contratar</Button>
      </div>
    </div>
  );
};
