'use client';

import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Modal } from '@/components/atoms/Modal';
import { Toast } from '@/components/atoms/Toast';
import { getBrandRegistrationWhatsAppMessage, openWhatsAppChat } from '@/utils/Whatsapp';
import { useState } from 'react';

export type BrandCategoryOption = {
  label: string;
  value: string;
};

type BrandRegistrationModalProps = {
  open: boolean;
  onClose: () => void;
  categories: BrandCategoryOption[];
  whatsappPhone?: string;
};

type FormState = {
  companyName: string;
  category: string;
  personalName: string;
  email: string;
};

const INITIAL_FORM: FormState = {
  companyName: '',
  category: '',
  personalName: '',
  email: '',
};

const STEPS = [
  {
    number: 1,
    title: 'Junte-se ao grupo EntãoPronto',
    description:
      'Sua empresa passa a fazer parte da rede colaborativa de marcas com propósito do Shopping EntãoPronto.',
  },
  {
    number: 2,
    title: 'Envie seus dados pra gente',
    description:
      'Preencha o formulário abaixo. Ao enviar, você abrirá uma conversa direta no WhatsApp com nosso time para alinharmos os próximos passos.',
  },
  {
    number: 3,
    title: 'Após aprovação, sua marca entra no ar',
    description:
      'Validamos suas informações e, assim que aprovado, sua vitrine fica disponível no Shopping. Você será avisado quando estiver online.',
  },
];

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(value);

export const BrandRegistrationModal = ({
  open,
  onClose,
  categories,
  whatsappPhone,
}: BrandRegistrationModalProps) => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const errors = {
    companyName: submitted && !form.companyName.trim(),
    category: submitted && !form.category,
    personalName: submitted && !form.personalName.trim(),
    email: submitted && (!form.email.trim() || !isValidEmail(form.email)),
  };

  const isValid
    = form.companyName.trim() !== ''
      && form.category !== ''
      && form.personalName.trim() !== ''
      && isValidEmail(form.email);

  const handleClose = () => {
    onClose();
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!isValid || !whatsappPhone) {
      return;
    }

    const selectedCategory
      = categories.find(category => category.value === form.category)?.label ?? form.category;

    const message = getBrandRegistrationWhatsAppMessage({
      companyName: form.companyName.trim(),
      category: selectedCategory,
      personalName: form.personalName.trim(),
      email: form.email.trim(),
    });

    openWhatsAppChat(whatsappPhone, message);

    setForm(INITIAL_FORM);
    setSubmitted(false);
    setToastOpen(true);
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} title="Cadastre sua marca" size="md">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            {STEPS.map(step => (
              <div key={step.number} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center">
                  {step.number}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-dark">{step.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
            <Input.Field
              type="text"
              label="Nome da empresa"
              placeholder="Ex.: Marca Exemplo Ltda."
              value={form.companyName}
              onChange={e => setForm(prev => ({ ...prev, companyName: e.target.value }))}
              isInvalid={errors.companyName}
            />

            <div>
              <label
                htmlFor="brand-category"
                className="ml-3 block text-dark text-sm font-normal"
              >
                Categoria
              </label>
              <select
                id="brand-category"
                value={form.category}
                onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                className={`px-3 py-2 cursor-pointer bg-white border placeholder:text-sm rounded-full w-full ${
                  errors.category ? 'border-error' : 'border-gray-350'
                }`}
              >
                <option value="" disabled>
                  Selecione uma categoria
                </option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <div className="ml-3 mt-0.5 text-error italic text-xs">
                  selecione uma categoria
                </div>
              )}
            </div>

            <Input.Field
              type="text"
              label="Seu nome"
              placeholder="João da Silva"
              value={form.personalName}
              onChange={e => setForm(prev => ({ ...prev, personalName: e.target.value }))}
              isInvalid={errors.personalName}
            />

            <Input.Field
              type="email"
              label="E-mail"
              placeholder="joao.silva@empresa.com"
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              isInvalid={errors.email}
            />

            <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end mt-2">
              <Button variant="grey-outlined" type="button" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        title="Cadastro enviado!"
        description="Continue a conversa pelo WhatsApp para concluir seu cadastro."
        variant="success"
      />
    </>
  );
};
