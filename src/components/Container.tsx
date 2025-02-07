import classnames from 'classnames';
import React from 'react';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props): React.ReactNode => {
  return (
    <div className={
      classnames(
        'container mx-auto px-5 md:px-10 max-w-full lg:max-w-[1440px] lg:px-20',
        className,
      )
    }
    >
      {children}
    </div>
  );
};

export default Container;
