import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import classnames from 'classnames';

type InputVariant = 'white-outlined' | 'secondary-outlined';

type BaseProps = {
  label?: string;
  placeholder: string;
  isInvalid?: boolean;
  value: string;
  rows?: number;
  icon?: ReactNode;
  variant?: InputVariant;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'] | 'textArea';
};

type InputProps = BaseProps &
  (
    | ({ type: 'textArea' } & TextareaHTMLAttributes<HTMLTextAreaElement>)
    | ({ type: Exclude<BaseProps['type'], 'textArea'> } & InputHTMLAttributes<HTMLInputElement>)
  );

export const Input = ({
  label,
  placeholder,
  type,
  isInvalid,
  value,
  rows = 5,
  onChange,
  icon,
  variant = 'white-outlined',
  ...props
}: InputProps) => {
  const inputId = `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  const stylesByVariant = {
    'white-outlined': {
      input: 'text-black border border-dark hover:bg-white hover:text-black',
      icon: 'text-dark',
    },
    'secondary-outlined': {
      input: 'text-secondary color-seconda border border-secondary hover:bg-secondary hover:text-white',
      icon: 'text-secondary group-hover:text-white',
    },
  };

  const baseClasses = classnames(
    'px-3 py-2 cursor-pointer placeholder:text-darkLight placeholder:text-sm',
    stylesByVariant[variant],
    {
      'border-error': isInvalid,
    },
  );

  return (
    <div className="min-w-60">
      {label && <label htmlFor={inputId} className="ml-3 block text-dark text-sm font-normal">{label}</label>}
      <div className="relative">
        {type === 'textArea'
          ? (
              <textarea
                id={inputId}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={`${baseClasses} rounded-xl w-full`}
                {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
              />
            )
          : (
              <>
                <input
                  id={inputId}
                  type={type}
                  value={value}
                  onChange={onChange}
                  placeholder={placeholder}
                  className={`${baseClasses} ${stylesByVariant[variant].input} rounded-full w-full ${icon ? 'pr-10' : ''}`}
                  {...(props as InputHTMLAttributes<HTMLInputElement>)}
                />
                {icon && (
                  <div className={`absolute right-3 top-1/2 -translate-y-1/2 ${stylesByVariant[variant].icon}`}>
                    {icon}
                  </div>
                )}
              </>
            )}
      </div>
      {isInvalid && <div className="ml-3 mt-0.5 text-error italic text-xs">campo inválido ou incompleto</div>}
    </div>
  );
};
