import { beforeEach, expect, test } from 'vitest';
import {
  changeTaskStatusTC,
  changeTaskTitleTC,
  createTasksTC,
  deleteTaskTC,
  tasksReducer,
  type TasksState,
} from '../tasks-slice.ts';
import { TaskPriority, TaskStatus } from '@/common/enums/enums.ts';
import { createTodolistTC, deleteTodolistTC } from '../todolists-slice.ts';

const taskDefaultValues = {
  description: '',
  deadline: '',
  addedDate: '',
  startDate: '',
  priority: TaskPriority.Low,
  order: 0,
};

let startState: TasksState;

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatus.Completed,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
    ],
  };
});

test('correct task should be deleted', () => {
  const endState = tasksReducer(
    startState,
    deleteTaskTC.fulfilled({ todolistId: 'todolistId2', taskId: '2' }, '', { todolistId: 'todolistId2', taskId: '2' }),
  );

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(2);
  expect(endState.todolistId2.find((t) => t.id === '2')).toBeUndefined();
});

test('correct task should be created at correct array', () => {
  const newTask = {
    id: '4',
    title: 'juice',
    status: TaskStatus.New,
    todoListId: 'todolistId2',
    ...taskDefaultValues,
  };

  const endState = tasksReducer(
    startState,
    createTasksTC.fulfilled({ task: newTask }, '', { todolistId: 'todolistId2', title: 'juice' }),
  );

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(4);
  expect(endState.todolistId2[0].title).toBe('juice');
  expect(endState.todolistId2[0].status).toBe(TaskStatus.New);
});

test('correct task should change its status', () => {
  const updatedTask = {
    ...startState.todolistId2[1],
    status: TaskStatus.New,
  };

  const endState = tasksReducer(
    startState,
    changeTaskStatusTC.fulfilled({ task: updatedTask }, '', {
      todolistId: 'todolistId2',
      taskId: '2',
      status: TaskStatus.New,
    }),
  );

  expect(endState.todolistId2[1].status).toBe(TaskStatus.New);
  expect(endState.todolistId1[1].status).toBe(TaskStatus.Completed);
});

test('correct task should change its title', () => {
  const updatedTask = {
    ...startState.todolistId2[1],
    title: 'coffee',
  };

  const endState = tasksReducer(
    startState,
    changeTaskTitleTC.fulfilled({ task: updatedTask, todolistId: 'todolistId2' }, '', {
      todolistId: 'todolistId2',
      taskId: '2',
      title: 'coffee',
    }),
  );

  expect(endState.todolistId2[1].title).toBe('coffee');
  expect(endState.todolistId1[1].title).toBe('JS');
});

test('array should be created for new todolist', () => {
  const newTodolist = {
    id: 'newTodolistId',
    title: 'New todolist',
    addedDate: '',
    order: 0,
    filter: 'all' as const,
  };

  const endState = tasksReducer(startState, createTodolistTC.fulfilled(newTodolist, '', 'New todolist'));

  const keys = Object.keys(endState);
  expect(keys.length).toBe(3);
  expect(endState[newTodolist.id]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
  const endState = tasksReducer(
    startState,
    deleteTodolistTC.fulfilled({ id: 'todolistId2' }, '', { id: 'todolistId2' }),
  );

  const keys = Object.keys(endState);
  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).toBeUndefined();
});
