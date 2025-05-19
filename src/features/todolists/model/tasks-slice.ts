import { createTodolistAC, createTodolistTC, deleteTodolistAC, deleteTodolistTC } from './todolists-slice.ts';
import { tasksApi } from '@/features/todolists/api/tasksApi.ts';
import { createAppSlice } from '@/common/utils';
import { DomainTask, type UpdateTaskModel } from '@/features/todolists/api/tasksApi.types.ts';
import { TaskStatus } from '@/common/enums';
import { RootState } from '@/app/store.ts';

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
    changeTaskStatusTC: create.asyncThunk(
      async (
        payload: {
          todolistId: string;
          taskId: string;
          status: TaskStatus;
        },
        { rejectWithValue, getState },
      ) => {
        const { todolistId, taskId, status } = payload;

        try {
          const allTasks = (getState() as RootState).tasks;
          const tasksForTodolists = allTasks[todolistId];
          const task = tasksForTodolists.find((t) => t.id === taskId);
          if (task) {
            const model: UpdateTaskModel = {
              description: task.description,
              title: task.title,
              priority: task.priority,
              startDate: task.startDate,
              deadline: task.deadline,
              status,
            };
            const res = await tasksApi.updateTask({
              taskId,
              todolistId,
              model,
            });
            return { task: res.data.data.item };
          } else {
            return rejectWithValue(null);
          }
        } catch (error) {
          return rejectWithValue(error);
        }
      },
      {
        fulfilled: (state, action) => {
          const updateTask = action.payload.task;
          const task = state[updateTask.todoListId].find((task) => task.id === updateTask.id);
          if (task) {
            task.status = updateTask.status;
          }
        },
      },
    ),
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

export const { changeTaskTitleAC, fetchTasksTC, createTasksTC, deleteTaskTC, changeTaskStatusTC } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const { selectTasks } = tasksSlice.selectors;

export type TasksState = Record<string, DomainTask[]>;
