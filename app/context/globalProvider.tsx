'use client';
import React, { createContext, useState, useContext } from 'react';
import themes from './themes';

export const GlobalContext = createContext<any>({});
export const GlobalUpdateContext = createContext<
  React.Dispatch<React.SetStateAction<number>> | undefined
>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);

  const theme = themes[selectedTheme];

  return (
    <GlobalContext.Provider value={{ theme }}>
      <GlobalUpdateContext.Provider value={setSelectedTheme}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
