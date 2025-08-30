import classnames from 'classnames';

type ButtonVariant =
  | 'link'
  | 'white'
  | 'white-outlined'
  | 'primary'
  | 'primary-dark'
  | 'primary-outlined'
  | 'secondary'
  | 'secondary-outlined'
  | 'warning'
  | 'error'
  | 'grey-outlined';

type ButtonProps = {
  children?: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant: ButtonVariant;
  Icon?: React.ReactNode;
  isLoading?: boolean;
  classNames?: string;
  type?: 'button' | 'submit' | 'link';
  href?: string;
  id?: string;
};

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  Icon,
  isLoading = false,
  className,
  type = 'button',
  href,
  id,
}: ButtonProps) => {
  const baseClasses
    = 'rounded-full font-[600] p-3.5  disabled:opacity-100 disabled:brightness-85 transition-all duration-200 cursor-pointer';

  const stylesByVariant = {
    'primary-dark': 'bg-primary-700 text-white',
    'primary-outlined': 'text-primary border border-primary hover:bg-primary hover:text-white',
    'primary': 'bg-primary text-white',
    'secondary': 'bg-secondary text-white hover:bg-secondary-dark',
    'secondary-outlined':
      'text-secondary border border-secondary hover:bg-secondary hover:text-white',
    'warning': 'bg-warning text-white',
    'error': 'bg-error text-white',
    'white': 'bg-white text-black',
    'white-outlined':
      'text-white border border-white hover:bg-white hover:text-black',
    'link': 'text-gray',
    'grey-outlined':
      'text-gray border border-gray-350 hover:bg-gray-350 hover:text-white',
  };

  const buttonClasses = classnames(
    baseClasses,
    stylesByVariant[variant as ButtonVariant],
    {
      'opacity-50 cursor-not-allowed': isLoading,
      'bg-transparent': variant === 'link',
    },
    {
      'px-5 py-3': !!children,
    },
    className,
  );

  const Tag = type === 'link' ? 'a' : 'button';

  return (
    <Tag
      type={type !== 'link' ? type : undefined}
      onClick={onClick}
      href={type === 'link' ? href : undefined}
      disabled={isLoading}
      className={buttonClasses}
      id={id}
    >
      <span className="flex items-center justify-center gap-2.5">
        {children}
        {isLoading
          ? (
              <span className="animate-spin rounded-full size-2.5 border-2 border-b-transparent border-r-transparent" />
            )
          : (
              Icon && (
                <span className="size-3 flex items-center justify-center">
                  {Icon}
                </span>
              )
            )}
      </span>
    </Tag>
  );
};
