import { createTodolistAC, createTodolistTC, deleteTodolistAC, deleteTodolistTC } from './todolists-slice.ts';
import { tasksApi } from '@/features/todolists/api/tasksApi.ts';
import { createAppSlice } from '@/common/utils';
import { DomainTask } from '@/features/todolists/api/tasksApi.types.ts';
import { TaskStatus } from '@/common/enums';

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: {} as TasksState,
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          const res = await tasksApi.getTasks(todolistId);
          return { task: res.data.items, todolistId };
        } catch (error) {
          return thunkAPI.rejectWithValue(error);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.task;
        },
      },
    ),
    createTasksTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, thunkAPI) => {
        try {
          const res = await tasksApi.createTask(payload);
          return { task: res.data.data.item };
        } catch (error) {
          return thunkAPI.rejectWithValue(error);
        }
      },
      {
        fulfilled: (state, action) => {
          const task = action.payload.task;
          state[action.payload.task.todoListId].unshift(task);
        },
      },
    ),
    deleteTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
        try {
          await tasksApi.deleteTask(payload);
          return payload;
        } catch (error) {
          return thunkAPI.rejectWithValue(error);
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId];
          const index = tasks.findIndex((task) => task.id === action.payload.taskId);
          if (index !== -1) {
            tasks.splice(index, 1);
          }
        },
      },
    ),
    changeTaskStatusAC: create.reducer<{
      todolistId: string;
      taskId: string;
      isDone: boolean;
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId);
      if (task) {
        task.status = action.payload.isDone ? TaskStatus.Completed : TaskStatus.New;
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

export const { changeTaskStatusAC, changeTaskTitleAC, fetchTasksTC, createTasksTC, deleteTaskTC } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const { selectTasks } = tasksSlice.selectors;

export type TasksState = Record<string, DomainTask[]>;
