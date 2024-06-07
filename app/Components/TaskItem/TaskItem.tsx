'use client';

import { Task, useGlobalState } from '@/app/context/globalProvider';
import { edit, trash } from '@/app/utils/Icons';
import formatDate from '@/app/utils/formatDate';
import React from 'react';
import styled from 'styled-components';

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  const { theme, deleteTask, updateTask } = useGlobalState();
  const { id, title, description, date, isCompleted, isImportant } = task;
  return (
    <TaskItemStyled className="task" key={id} theme={theme}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              updateTask(task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              updateTask(task);
            }}
          >
            Incomplete
          </button>
        )}
        <button className="edit">{edit}</button>
        <button className="delete" onClick={() => deleteTask(id)}>
          {trash}
        </button>
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

  .date {
    margin-top: auto;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;
      i {
        font-size: 1.4rem;
        color: ${props => props.theme.colorGrey2};
      }
    }
    .edit {
      margin-left: auto;
    }
    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${props => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${props => props.theme.colorGreenDark};
    }
  }
`;
export default TaskItem;
