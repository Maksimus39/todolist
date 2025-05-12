import {
  type ChangeEvent,
  type CSSProperties,
  useEffect,
  useState,
} from 'react';
import Checkbox from '@mui/material/Checkbox';
import { CreateItemForm, EditableSpan } from '@/common/components';
import { Todolist } from '@/features/todolists/api/todolistsApi.types.ts';
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts';
import { tasksApi } from '@/features/todolists/api/tasksApi.ts';
import {
  DomainTask,
  UpdateTaskModel,
} from '@/features/todolists/api/tasksApi.types.ts';

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({});

  useEffect(() => {
    todolistsApi.getTodolist().then((res) => {
      const todolists = res.data;
      setTodolists(todolists);
      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((res) => {
          setTasks({ ...tasks, [todolist.id]: res.data.items });
        });
      });
    });
  }, [setTodolists, setTasks]);

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item;
      setTodolists([newTodolist, ...todolists]);
    });
  };

  const deleteTodolist = (todolistId: string) => {
    todolistsApi.deleteTodolist(todolistId).then(() => {
      setTodolists(todolists.filter((el) => el.id !== todolistId));
    });
  };

  const changeTodolistTitle = (todolistId: string, title: string) => {
    todolistsApi.changeTodolistTitle(todolistId, title).then(() => {
      setTodolists(
        todolists.map((t) =>
          t.id === todolistId ? { ...t, title: title } : t,
        ),
      );
    });
  };

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask(todolistId, title).then((res) => {
      setTasks({
        ...tasks,
        [todolistId]: [res.data.data.item, ...tasks[todolistId]],
      });
    });
  };

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask(todolistId, taskId).then((res) => {
      console.log(res.data);
    });
  };

  const changeTaskStatus = (
    e: ChangeEvent<HTMLInputElement>,
    task: DomainTask,
  ) => {
    const todolistId = task.todoListId;

    const model: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: e.currentTarget.checked ? 2 : 0,
    };
    tasksApi
      .changeTaskStatus({
        todolistId,
        taskId: task.id,
        model: model,
      })
      .then((res) => {
        setTasks({
          ...tasks,
          [todolistId]: tasks[todolistId].map((el) =>
            el.id === task.id ? res.data.data.item : el,
          ),
        });
      });
  };

  const changeTaskTitle = (task: any, title: string) => {};

  return (
    <div style={{ margin: '20px' }}>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map((todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan
              value={todolist.title}
              onChange={(title) => changeTodolistTitle(todolist.id, title)}
            />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm
            onCreateItem={(title) => createTask(todolist.id, title)}
          />
          {tasks[todolist.id]?.map((task) => (
            <div key={task.id}>
              <Checkbox
                checked={task.status === 2}
                onChange={(e) => changeTaskStatus(e, task)}
              />
              <EditableSpan
                value={task.title}
                onChange={(title) => changeTaskTitle(task, title)}
              />
              <button onClick={() => deleteTask(todolist.id, task.id)}>
                x
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const container: CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
};
