'use client';

import { formatCurrency } from '@/utils/formatCurrencyBRL';
import { openWhatsAppChat } from '@/utils/openWhatsAppChat';
import Image from 'next/image';
import { Button } from './atoms/Button';
import Typography from './Typography';

type ProductAndServiceProps = {
  name: string;
  storeName: string;
  description: string;
  price: number;
  discount?: number;
  image: string ;
  whatsappContact: string;
};

export const ProductOrServiceCard = ({ name, description, price, image, discount, whatsappContact, storeName }: ProductAndServiceProps) => {
  const formatedPrice = formatCurrency(price);
  const whatsAppMessage = `Olá, estava navegando no Shopping EntãoPronto e encontrei a/o ${storeName}.

  Gostaria de mais informações sobre o seguinte produto/serviço:
  ${name}
  ${description}
  ${formatedPrice}`;

  const handleContactStore = () => openWhatsAppChat(whatsappContact, whatsAppMessage);

  return (
    <div className="flex flex-col">
      <Image src={image} className="rounded-lg max-h-64" alt={`Product: ${name} image`} width={382} height={269} />
      <Typography variant="h4" className="pt-2 pb-1 text-dark">
        {name}
      </Typography>
      <Typography variant="bodySmall" tag="p" className=" text-secondary">{description}</Typography>
      <div className="flex flex-wrap gap-2 mt-6 justify-between items-end">
        <div>
          {/* TODO: REMOVE THIS WHEN DISCOUNT IS AVAIBLE ON SANITY RESPONSE */}
          {discount
            ? (
                <span className="text-xs font-light line-through">
                  {formatCurrency(discount)}
                </span>
              )
            : (
                <span className="text-sm font-extralight line-through">
                  {formatCurrency(price * (1 + Math.random() * 0.8))}
                </span>
              )}
          <Typography variant="bodySmall" tag="p" className="italic">a partir de</Typography>
          <span className="text-2xl font-medium">
            {formatedPrice}
          </span>
        </div>
        <Button variant="primary" onClick={handleContactStore}>Quero contratar</Button>
      </div>
    </div>
  );
};
