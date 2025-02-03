import React from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

type TypographyProps = {
  variant: Variant;
  tag?: Tag;
  className?: string;
  children: React.ReactNode;
};

const sharedClasses = 'my-0 p-0 font-primary';

const variantClasses: Record<Variant, string> = {
  h1: 'text-4xl font-bold  my-0! p-0  leading-tight',
  h2: 'text-3xl font-bold  my-0! p-0  leading-tight',
  h3: 'text-2xl font-semibold  my-0! p-0  leading-tight',
  h4: 'text-xl font-semibold  my-0! p-0  leading-tight',
  h5: 'text-lg font-semibold  my-0! p-0  leading-tight',
  h6: 'text-base font-bold  my-0! p-0  leading-tight',
  body1: 'text-base font-normal leading-relaxed',
  body2: 'text-sm font-normal leading-relaxed',
  caption: 'text-xs font-light italic',
  overline: 'text-xs font-bold uppercase tracking-wide',
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  tag = 'p',
  className = '',
  children,
}) => {
  const combinedClasses = `${variantClasses[variant]} ${sharedClasses} ${className}`;
  const Tag = tag;

  return (
    <Tag className={combinedClasses}>
      {children}
    </Tag>
  );
};

export default Typography;
