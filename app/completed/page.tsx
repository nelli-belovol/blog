'use client';

import React from 'react';
import { useGlobalState } from '../context/globalProvider';
import Tasks from '../Tasks/Tasks';

const page = () => {
  const { completedTasks } = useGlobalState();

  return <Tasks title={'Completed Tasks'} tasks={completedTasks} />;
};

export default page;
