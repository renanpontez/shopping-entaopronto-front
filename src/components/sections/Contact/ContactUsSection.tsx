'use client';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { TextArea } from '@/components/atoms/TextArea';

// type ContactUsProps = {
//   email?: string;
// };

export const ContactUs = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO : ADD LOGIC TO SEND EMAIL TO STORE
  };

  return (
    <form className="space-y-3 w-full sm:w-auto" onSubmit={handleSubmit}>
      <Input.Field type="text" label="Nome" placeholder="João da Silva" />
      <Input.Field type="email" label="E-mail de contato" placeholder="joao.silva@empresa.com" />
      <TextArea label="Mensagem" placeholder="Aqui vai uma mensagem que o usuário deseja enviar para o cliente ou para a própria equipe.." />
      <Button variant="primary" type="submit">Entrar em contato</Button>
    </form>
  );
};
