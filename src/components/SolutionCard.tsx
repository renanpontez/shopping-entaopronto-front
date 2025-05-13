'use client';

import { formatCurrency } from '@/utils/formatCurrencyBRL';
import { getStoreWhatsAppMessage, openWhatsAppChat } from '@/utils/Whatsapp';
import Image from 'next/image';
import { Button } from './atoms/Button';
import Typography from './Typography';

type SolutionProps = {
  name: string;
  storeName: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
  whatsappContact: string;
};

export const SolutionCard = ({ name, description, price, image, discount, whatsappContact, storeName }: SolutionProps) => {
  const formattedPrice = formatCurrency(price);
  const whatsAppMessage = getStoreWhatsAppMessage(storeName, name, description, formattedPrice);
  const handleContactStore = () => openWhatsAppChat(whatsappContact, whatsAppMessage);

  return (
    <div className="flex flex-col max-w-[382px]">
      {image && (
        <Image
          src={image}
          className="rounded-lg max-h-64 object-cover"
          alt={`Product: ${name} image`}
          width={382}
          height={269}
        />
      )}
      <Typography variant="h4" className="pt-2 pb-1 text-dark">
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
