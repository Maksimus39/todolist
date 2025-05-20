import { createTodolistTC, deleteTodolistTC } from './todolists-slice.ts';
import { tasksApi } from '@/features/todolists/api/tasksApi.ts';
import { createAppSlice } from '@/common/utils';
import { DomainTask, type UpdateTaskModel } from '@/features/todolists/api/tasksApi.types.ts';
import { TaskStatus } from '@/common/enums';
import { RootState } from '@/app/store.ts';
import { changeStatusModeAC } from '@/app/app-slice.ts';

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: {} as TasksState,
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, { rejectWithValue, dispatch }) => {
        try {
          // on
          dispatch(changeStatusModeAC({ status: 'loading' }));
          const res = await tasksApi.getTasks(todolistId);
          return { task: res.data.items, todolistId };
        } catch (error) {
          return rejectWithValue(error);
        } finally {
          dispatch(changeStatusModeAC({ status: 'idle' }));
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.task;
        },
      },
    ),
    createTasksTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, { rejectWithValue, dispatch }) => {
        try {
          // on
          dispatch(changeStatusModeAC({ status: 'loading' }));
          const res = await tasksApi.createTask(payload);
          return { task: res.data.data.item };
        } catch (error) {
          return rejectWithValue(error);
        } finally {
          dispatch(changeStatusModeAC({ status: 'idle' }));
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
      async (payload: { todolistId: string; taskId: string }, { rejectWithValue, dispatch }) => {
        try {
          // on
          dispatch(changeStatusModeAC({ status: 'loading' }));
          await tasksApi.deleteTask(payload);
          return payload;
        } catch (error) {
          return rejectWithValue(error);
        } finally {
          dispatch(changeStatusModeAC({ status: 'idle' }));
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
        { rejectWithValue, getState, dispatch },
      ) => {
        const { todolistId, taskId, status } = payload;

        try {
          // on
          dispatch(changeStatusModeAC({ status: 'loading' }));
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
        } finally {
          dispatch(changeStatusModeAC({ status: 'idle' }));
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
    changeTaskTitleTC: create.asyncThunk(
      async (
        payload: {
          todolistId: string;
          taskId: string;
          title: string;
        },
        { rejectWithValue, getState, dispatch },
      ) => {
        const { todolistId, taskId, title } = payload;

        try {
          // on
          dispatch(changeStatusModeAC({ status: 'loading' }));
          const allTasks = (getState() as RootState).tasks;
          const tasksForTodolists = allTasks[todolistId];
          const task = tasksForTodolists.find((t) => t.id === taskId);

          if (task) {
            const model: UpdateTaskModel = {
              description: task.description,
              title,
              priority: task.priority,
              startDate: task.startDate,
              deadline: task.deadline,
              status: task.status,
            };
            const res = await tasksApi.updateTask({
              todolistId,
              taskId,
              model,
            });
            return { task: res.data.data.item, todolistId };
          } else {
            return rejectWithValue(null);
          }
        } catch (e) {
          return rejectWithValue(e);
        } finally {
          dispatch(changeStatusModeAC({ status: 'idle' }));
        }
      },
      {
        fulfilled: (state, action) => {
          const { task: updatedTask, todolistId } = action.payload;
          const tasks = state[todolistId];
          const taskIndex = tasks.findIndex((t) => t.id === updatedTask.id);

          if (taskIndex !== -1) {
            tasks[taskIndex] = updatedTask;
          }
        },
      },
    ),
  }),
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        // создаем пустой массив задач для нового тудулиста
        state[action.payload.id] = [];
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id];
      });
  },
});

export const { fetchTasksTC, createTasksTC, deleteTaskTC, changeTaskStatusTC, changeTaskTitleTC } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const { selectTasks } = tasksSlice.selectors;

export type TasksState = Record<string, DomainTask[]>;
