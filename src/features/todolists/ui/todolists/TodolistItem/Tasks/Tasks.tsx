import { TaskStatus } from '@/common/enums';
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi';
import List from '@mui/material/List';
import { TaskItem } from './TaskItem/TaskItem';
import { TasksSkeleton } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton.tsx';
import { DomainTodolist } from '@/features/todolists/lib/types';
import { useState } from 'react';
import { TasksPagination } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination.tsx';

type Props = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist;

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useGetTasksQuery({
    todolistId: id,
    params: { page },
  });

  let filteredTasks = data?.items;
  if (filter === 'active') {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New);
  }
  if (filter === 'completed') {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed);
  }

  if (isLoading) {
    return <TasksSkeleton />;
  }

  return (
    <>
      {isFetching && !isLoading && <div>Обновление данных...</div>}

      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist} />)}</List>
          <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </>
  );
};
