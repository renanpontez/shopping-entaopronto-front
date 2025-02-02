import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

type BaseProps = {
  label: string;
  placeholder: string;
  isInvalid?: boolean;
  value: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'] | 'textArea';
};

type InputProps = BaseProps &
  (
    | ({ type: 'textArea' } & TextareaHTMLAttributes<HTMLTextAreaElement>)
    | ({ type: Exclude<BaseProps['type'], 'textArea'> } & InputHTMLAttributes<HTMLInputElement>)
  );

export const Input = ({ label, placeholder, type, isInvalid, value, rows = 5, onChange, ...props }: InputProps) => {
  const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const baseClasses = `px-3 py-2 text-dark border placeholder-darkLight cursor-pointer ${isInvalid ? 'border-error' : ''}`;

  return (
    <div className="min-w-60">
      {label && <label htmlFor={inputId} className="ml-3 block text-dark text-sm font-normal">{label}</label>}
      {type === 'textArea'
        ? (
            <textarea
              id={inputId}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              rows={rows}
              className={`${baseClasses} rounded-xl text-dark`}
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          )
        : (
            <input
              id={inputId}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`${baseClasses} rounded-full text-dark`}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
      {isInvalid && <div className="ml-3 mt-0.5 text-error italic text-xs">campo inválido ou incompleto</div>}
    </div>
  );
};
