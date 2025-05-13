import classnames from 'classnames';
import { useState } from 'react';

type ToggleButtonVariant =
  | 'primary'
  | 'primary-dark'
  | 'primary-outlined'
  | 'secondary'
  | 'secondary-outlined'
  | 'white'
  | 'white-outlined';

type ToggleButtonProps = {
  label?: string;
  labelPosition?: 'left' | 'right';
  className?: string;
  onChange?: (isActive: boolean) => void;
  variant?: ToggleButtonVariant;
  Icon?: React.ReactNode;
  isActive?: boolean;
  defaultActive?: boolean;
};

export const ToggleButton = ({
  label,
  labelPosition = 'right',
  className,
  onChange,
  variant = 'primary',
  Icon,
  isActive: externalIsActive,
  defaultActive = false,
}: ToggleButtonProps) => {
  const [internalIsActive, setInternalIsActive] = useState(defaultActive);

  const isControlled = externalIsActive !== undefined;
  const isActive = isControlled ? externalIsActive : internalIsActive;

  const baseClasses = 'rounded-full font-normal py-1 px-3.5 transition-all duration-200 cursor-pointer flex items-center gap-2.5';

  const stylesByVariant = {
    'primary-dark': isActive ? 'bg-primary-700 text-white' : 'bg-gray-200 text-gray-700',
    'primary-outlined': isActive
      ? 'bg-primary text-white border border-primary'
      : 'text-primary border border-primary',
    'primary': isActive ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700',
    'secondary': isActive ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-700',
    'secondary-outlined': isActive
      ? 'bg-secondary text-white border border-secondary'
      : 'text-secondary border border-secondary',
    'white': isActive ? 'bg-white text-black' : 'bg-gray-200 text-gray-700',
    'white-outlined': isActive
      ? 'bg-white text-black border border-white'
      : 'text-white border border-white',
  };

  const buttonClasses = classnames(
    baseClasses,
    stylesByVariant[variant as ToggleButtonVariant],
    className,
  );

  const handleClick = () => {
    if (!isControlled) {
      setInternalIsActive(!isActive);
    }
    onChange?.(!isActive);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={buttonClasses}
      aria-pressed={isActive}
    >
      {labelPosition === 'left' && label && <span>{label}</span>}
      {Icon && (
        <span className="size-3 flex items-center justify-center">
          {Icon}
        </span>
      )}
      {labelPosition === 'right' && label && <span>{label}</span>}
    </button>
  );
};
