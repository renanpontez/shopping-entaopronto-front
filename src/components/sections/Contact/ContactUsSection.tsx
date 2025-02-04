'use client';
import { Input } from '@/components/atoms/Input';

export const ContactUs = () => {
  return (
    <div>
      <Input.Field label="Nome" placeholder="123" value="test" type="text" onChange={() => null} />
      <Input.Label label="Test" elementId="123" />
      <h3>Entre em Contato</h3>
      <p>Fale conosco para tirar dúvidas ou saber mais sobre como podemos ajudar.</p>

      <form className="flex flex-col">
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="E-mail" />
        <textarea placeholder="Mensagem" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
