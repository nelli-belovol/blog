'use client';

import React, { useEffect, useState } from 'react';
import GlobalStylesProvider from './GlobalStylesProvider';
import { Toaster } from 'react-hot-toast';
import { GlobalProvider } from '../context/globalProvider';

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

  return (
    <GlobalProvider>
      <Toaster />
      {children}
    </GlobalProvider>
  );
};

export default ContextProvider;
