import type { ChangeEvent, TextareaHTMLAttributes } from 'react';
import { Input } from '@/components/atoms/Input';
import classNames from 'classnames';

type TextAreaProps = {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  isInvalid?: boolean;
  isDisabled?: boolean;
  label?: string;
};

export const TextArea = ({
  value,
  onChange,
  placeholder,
  rows = 5,
  isDisabled,
  isInvalid,
  label,
  ...props
}: TextAreaProps) => {
  const elementId = `input-${Math.random().toString(36).substring(7)}`;

  const textAreaBaseStyles = classNames(
    'px-3 py-2 cursor-pointer placeholder:text-darkLight bg-white border border-gray-350 placeholder:text-sm rounded-xl w-full',
    {
      'border-error': isInvalid,
    },
  );

  return (
    <div className="min-w-60">
      <Input.Label label={label} elementId={elementId} />
      <div className="relative">
        <textarea
          id={elementId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={textAreaBaseStyles}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      </div>
      <Input.Error isInvalid={isInvalid} />
    </div>

  );
};
