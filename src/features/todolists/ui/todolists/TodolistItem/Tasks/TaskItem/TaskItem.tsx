import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan';
import { useAppDispatch } from '@/common/hooks';
import { changeTaskStatusTC, changeTaskTitleTC, deleteTaskTC } from '@/features/todolists/model/tasks-slice.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import type { ChangeEvent } from 'react';
import { getListItemSx } from './TaskItem.styles';
import { DomainTask } from '@/features/todolists/api/tasksApi.types.ts';
import { TaskStatus } from '@/common/enums';

type Props = {
  task: DomainTask;
  todolistId: string;
};

export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch();

  const deleteTask = () => {
    dispatch(deleteTaskTC({ todolistId, taskId: task.id }));
  };

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
    dispatch(
      changeTaskStatusTC({
        todolistId,
        taskId: task.id,
        status: newStatusValue,
      }),
    );
  };

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleTC({ todolistId, taskId: task.id, title }));
  };

  const isDone = task.status === TaskStatus.Completed;
  return (
    <ListItem sx={getListItemSx(isDone)}>
      <div>
        <Checkbox checked={isDone} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
