import classnames from 'classnames';

type ButtonVariant = 'Link' | 'white' | 'primary' | 'secondary' | 'warning' | 'error';

type ButtonProps = {
  children?: string | React.ReactNode;
  onClick: () => void;
  isOutlined?: boolean;
  color: ButtonVariant;
  Icon?: React.ReactNode;
  isLoading: boolean;
  classNames?: string;
};

export const Button = ({
  children,
  onClick,
  isOutlined = false,
  color = 'primary',
  Icon,
  isLoading = false,
  classNames,
}: ButtonProps) => {
  const baseClasses = 'rounded-full font-normal p-3.5 hover:brightness-85 disabled:opacity-100 disabled:brightness-85 transition-all duration-200 cursor-pointer';

  const variantClasses = {
    Link: 'text-gray hover:opacity-90 ',
    white: 'text-black bg-white hover:bg-opacity-90',
    primary: isOutlined
      ? 'text-black border border-primary hover:bg-primary hover:text-white'
      : 'bg-primary text-white hover:bg-opacity-90',
    secondary: isOutlined
      ? 'text-black border border-secondary hover:bg-secondary hover:text-white'
      : 'bg-secondary text-white hover:bg-opacity-90',
    warning: 'bg-warning text-white hover:bg-opacity-90',
    error: 'bg-error text-white hover:bg-opacity-90',
  };

  const buttonClasses = classnames(
    baseClasses,
    variantClasses[color as ButtonVariant],
    {
      'opacity-50 cursor-not-allowed': isLoading,
      'bg-transparent': isOutlined || color === 'Link',
    },
    {
      'px-5 py-3': !!children,
    },
    classNames,
  );

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={buttonClasses}
    >
      <span className="flex items-center justify-center gap-2.5">
        {children}
        {Icon && !isLoading && <span className="size-3 flex items-center justify-center">{Icon}</span>}
        {isLoading ? (<span className="animate-spin rounded-full size-2.5 border-2 border-b-transparent border-r-transparent" />) : (<>{Icon && <span className="size-3 flex items-center justify-center">{Icon}</span>}</>)}
      </span>
    </button>
  );
};
