'use client';

import React, { useEffect, useState } from 'react';
import GlobalStylesProvider from './GlobalStylesProvider';

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 200);
    return () => {};
  }, []);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return <GlobalStylesProvider>{children}</GlobalStylesProvider>;
};

export default ContextProvider;
