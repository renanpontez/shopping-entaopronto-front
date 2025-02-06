'use client';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { TextArea } from '@/components/atoms/TextArea';
import { openWhatsAppChat } from '@/utils/openWhatsAppChat';
import { useState } from 'react';

type ContactUsProps = {
  whatsappContact: string;
};

export const ContactUs = ({ whatsappContact }: ContactUsProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messageFormated = `Olá! Estou entrando em contato pelo site da Shopping EntãoPronto.
    Me chamo ${name} de ${email} e gostaria de saber mais sobre: ${message}
    `;
    openWhatsAppChat(whatsappContact, messageFormated);
  };

  return (
    <form className="space-y-3 w-full sm:w-auto" onSubmit={handleSubmit}>
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
        placeholder="Aqui vai uma mensagem que o usuário deseja enviar para o cliente ou para a própria equipe.."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button variant="primary" type="submit">Entrar em contato</Button>
    </form>
  );
};
