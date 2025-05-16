import { createSlice, nanoid } from '@reduxjs/toolkit';
import { createTodolistAC, createTodolistTC, deleteTodolistAC, deleteTodolistTC } from './todolists-slice.ts';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksState,
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{
      todolistId: string;
      taskId: string;
    }>((state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((task) => task.id === action.payload.taskId);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
    }),
    createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const newTask: Task = {
        title: action.payload.title,
        isDone: false,
        id: nanoid(),
      };
      state[action.payload.todolistId].unshift(newTask);
    }),
    changeTaskStatusAC: create.reducer<{
      todolistId: string;
      taskId: string;
      isDone: boolean;
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId);
      if (task) {
        task.isDone = action.payload.isDone;
      }
    }),
    changeTaskTitleAC: create.reducer<{
      todolistId: string;
      taskId: string;
      title: string;
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId);
      if (task) {
        task.title = action.payload.title;
      }
    }),
  }),
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = [];
      })
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        // создаем пустой массив задач для нового тудулиста
        state[action.payload.id] = [];
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id];
      });
  },
});

export const { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const { selectTasks } = tasksSlice.selectors;

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksState = Record<string, Task[]>;
