'use client';

import { Task, useGlobalState } from '@/app/context/globalProvider';
import { edit, trash } from '@/app/utils/Icons';
import React from 'react';
import styled from 'styled-components';

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  const { theme } = useGlobalState();
  const { id, title, description, date, isCompleted, isImportant } = task;
  return (
    <TaskItemStyled className="task" key={id} theme={theme}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p className="date">{date}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button className="completed">Completed</button>
        ) : (
          <button className="incomplete">Incomplete</button>
        )}
        <button className="edit">{edit}</button>
        <button className="delete">{trash}</button>
        <p>{isCompleted}</p>
        <p>{isImportant}</p>
      </div>
    </TaskItemStyled>
  );
};

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${props => props.theme.borderColor2};
  box-shadow: ${props => props.theme.shadow7};
  border: 2px solid ${props => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export default TaskItem;
