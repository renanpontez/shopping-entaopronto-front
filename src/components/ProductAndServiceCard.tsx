'use client';

import { formatCurrency } from '@/utils/formatCurrencyBRL';
import { openWhatsAppChat } from '@/utils/openWhatsAppChat';
import Image, { type StaticImageData } from 'next/image';
import { Button } from './atoms/Button';
import Typography from './Typography';

type ProductAndServiceProps = {
  name: string;
  description: string;
  price: number;
  discount?: number;
  image: string | StaticImageData;
  whatsappContact: number;
};

export const ProductAndServiceCard = ({ name, description, price, image, discount, whatsappContact }: ProductAndServiceProps) => {
  const formatedPrice = formatCurrency(price);
  const whatsAppMagge = `Olá, me interessei pelo ${name}, ${description} e ${formatedPrice} e gostaria de saber mais sobre o produto.`;
  return (
    <div className="max-w-96 ">
      <Image src={image} className="rounded-lg max-h-64" alt={`alt-image-${name}`} width={382} height={269} />
      <Typography variant="h4" className="pt-2 pb-1 text-dark">
        {name}
      </Typography>
      <Typography variant="bodySmall" tag="p" className=" text-secondary">{description}</Typography>
      <div className="flex flex-wrap gap-2 mt-6 justify-between items-end">
        <div>
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
        {' '}
        <Button variant="primary" onClick={() => openWhatsAppChat(whatsappContact, whatsAppMagge)}>Quero contratar</Button>
      </div>
    </div>
  );
};
