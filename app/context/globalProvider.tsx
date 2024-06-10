'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import themes from './themes';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';

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
  createdAt: Date;
  updatedAt: Date;
  userId: String;
};
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  const allTasks = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get('/api/tasks');
      res.data.sort(
        (
          a: { createdAt: string | number | Date },
          b: { createdAt: string | number | Date },
        ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setTasks(res.data);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
    setIsLoading(false);
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success('Task deleted');

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const res = await axios.put(`/api/tasks/`, task);
      toast.success('Task updated');

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const openModal = (key: string) => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const completedTasks = tasks
    .filter(task => task.isCompleted)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const importantTasks = tasks
    .filter(task => task.isImportant)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const incompleteTasks = tasks
    .filter(task => !task.isCompleted)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  useEffect(() => {
    if (user) allTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        isLoading,
        deleteTask,
        completedTasks,
        importantTasks,
        incompleteTasks,
        updateTask,
        openModal,
        closeModal,
        modal,
        allTasks,
        collapsed,
        collapseMenu,
      }}
    >
      <GlobalUpdateContext.Provider value={setSelectedTheme}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
