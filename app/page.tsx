'use client';

import Tasks from './Components/Tasks/Tasks';
import { useGlobalState } from './context/globalProvider';

export default function Home() {
  const { tasks } = useGlobalState();

  return (
    <>
      <Tasks title={'All tasks'} tasks={tasks} />
    </>
  );
}
