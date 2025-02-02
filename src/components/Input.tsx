import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder: string;
  isInvalid?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: React.InputHTMLAttributes<HTMLInputElement> | 'textArea';
};
export const Input = ({ label, placeholder, type, isInvalid, value, onChange, ...props }: InputProps) => {
  const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const baseClasses = `px-3 py-2 text-dark border placeholder-darkLight cursor-pointer ${isInvalid ? 'border-error' : ''}`;
  const inputClasses = 'rounded-full';
  const textareaClasses = 'rounded-lg';

  return (
    <div className="min-w-60 text-dark">
      {label && <label htmlFor={inputId} className="ml-3 block text-dark text-sm font-normal">{label}</label>}
      {type === 'textArea'
        ? (
            <textarea
              id={inputId}
              value={value}
              onChange={() => onChange}
              placeholder={placeholder}
              className={`${baseClasses} ${textareaClasses}`}
              rows={4}
            />
          )
        : (
            <input
              id={inputId}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`${baseClasses} ${inputClasses}`}
              {...props}
            />
          )}
      {isInvalid && <div className="ml-3 mt-0.5 text-error italic text-xs">campo inválido ou incompleto</div>}
    </div>
  );
};
