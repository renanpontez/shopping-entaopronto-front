import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props): React.ReactNode => {
  return <div className="container mx-auto px-10 max-w-full lg:max-w-[1440px] lg:px-20">{children}</div>;
};

export default Container;
