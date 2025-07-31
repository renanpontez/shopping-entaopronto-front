import classnames from 'classnames';
import { type InputHTMLAttributes, useId } from 'react';
import { Input } from '.';

export type BaseProps = {
  label?: string;
  placeholder: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  value?: string;
  icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  className?: string;
};

export type InputFieldProps = BaseProps &
  (
    | ({ type: InputHTMLAttributes<HTMLInputElement> })
  );

export const InputField = ({
  label,
  placeholder,
  type,
  isInvalid,
  value,
  onChange,
  icon,
  className,
  ...props
}: InputFieldProps) => {
  const inputId = useId();

  const inputBaseStyles = classnames(
    'px-3 py-2 cursor-pointer bg-white placeholder:text-darkLight border border-gray-350 placeholder:text-sm rounded-full w-full',
    {
      'border-error': isInvalid,
      'pr-10': icon,
    },
    className,
  );

  return (
    <div className="min-w-60">
      <Input.Label label={label} elementId={inputId} />
      <div className="relative">
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputBaseStyles}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary group-hover:text-white">
            {icon}
          </div>
        )}
      </div>
      <Input.Error isInvalid={isInvalid} />
    </div>
  );
};
