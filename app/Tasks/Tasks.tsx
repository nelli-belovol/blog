'use client';

import React from 'react';
import styled from 'styled-components';
import { Task, useGlobalState } from '../context/globalProvider';
import CreateContent from '../Components/Modals/CreateContent';
import TaskItem from '../Components/TaskItem/TaskItem';
import { plus } from '../utils/Icons';
import Modal from '../Components/Modals/Modal';

interface Props {
  title: string;
  tasks: Task[];
}
const Tasks = ({ title, tasks }: Props) => {
  const { theme, isLoading, openModal, modal } = useGlobalState();

  return (
    <TaskStyled theme={theme}>
      <h1>{title}</h1>
      {modal && <Modal content={<CreateContent />} />}
      {!isLoading ? (
        <div className="tasks grid">
          {tasks.map((task: Task) => (
            <TaskItem key={task.id} task={task} />
          ))}
          <button className="create-task" onClick={openModal}>
            {plus} Add new task
          </button>
        </div>
      ) : (
        <div className="tasks-loader w-full h-full flex justify-center items-center">
          <span className="loader"></span>
        </div>
      )}
    </TaskStyled>
  );
};

const TaskStyled = styled.main`
  padding: 2rem;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colorBg2};
  border: 2px solid ${props => props.theme.borderColor2};
  border-radius: 1rem;

  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${props => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }
  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${props => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${props => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${props => props.theme.colorGrey5};
      color: ${props => props.theme.colorGrey0};
    }
  }
  .tasks {
    margin: 4rem 0;
  }
`;

export default Tasks;
