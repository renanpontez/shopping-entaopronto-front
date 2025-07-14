'use client';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { TextArea } from '@/components/atoms/TextArea';
import { getShoppingWhatsAppMessage, openWhatsAppChat } from '@/utils/Whatsapp';
import { useState } from 'react';

type ContactUsProps = {
  whatsappPhoneNumber?: string;
  storeName?: string;
};

export const ContactUs = ({ whatsappPhoneNumber, storeName }: ContactUsProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!whatsappPhoneNumber) {
      // TODO: SHOW TOASTR ERROR
      return;
    };

    const messageFormated = getShoppingWhatsAppMessage(name, email, message);
    openWhatsAppChat(whatsappPhoneNumber, messageFormated);
  };

  return (
    <form className="space-y-3 sm:w-auto w-full md:w-[500px]">
      <Input.Field
        type="text"
        label="Nome"
        placeholder="João da Silva"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Input.Field
        type="email"
        label="E-mail de contato"
        placeholder="joao.silva@empresa.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextArea
        label="Mensagem"
        placeholder={storeName ? `Enviar mensagem para ${storeName}` : 'Enviar mensagem para a equipe'}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button variant="primary" type="submit" onClick={() => handleSubmit()}>Entrar em contato</Button>
    </form>
  );
};
