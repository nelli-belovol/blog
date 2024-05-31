'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import themes from './themes';
import axios from 'axios';
import toast from 'react-hot-toast';

export const GlobalContext = createContext<any>({});
export const GlobalUpdateContext = createContext<
  React.Dispatch<React.SetStateAction<number>> | undefined
>(undefined);

export type Task = {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
};
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const allTasks = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get('/api/tasks');
      console.log(res.data);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    allTasks();
  }, []);

  return (
    <GlobalContext.Provider value={{ theme, tasks, isLoading }}>
      <GlobalUpdateContext.Provider value={setSelectedTheme}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
