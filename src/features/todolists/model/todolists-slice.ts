import { Todolist } from '@/features/todolists/api/todolistsApi.types.ts';
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts';
import { createAppSlice } from '@/common/utils';
import { changeStatusModeAC } from '@/app/app-slice.ts';

export const todolistsSlice = createAppSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    changeTodolistFilterAC: create.reducer<{
      id: string;
      filter: FilterValues;
    }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    }),
    changeTodolistTitleTC: create.asyncThunk(
      async (payload: { id: string; title: string }, { rejectWithValue, dispatch }) => {
        try {
          // on
          dispatch(changeStatusModeAC({ status: 'loading' }));
          await todolistsApi.changeTodolistTitle(payload);
          return payload;
        } catch (error) {
          return rejectWithValue(error);
        } finally {
          dispatch(changeStatusModeAC({ status: 'idle' }));
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todolist) => todolist.id === action.payload.id); // 3. Ищем по id из payload
          if (index !== -1) {
            state[index].title = action.payload.title; // 4. Обновляем title
          }
        },
      },
    ),
    createTodolistTC: create.asyncThunk(
      async (title: string, { rejectWithValue, dispatch }) => {
        try {
          // on
          dispatch(changeStatusModeAC({ status: 'loading' }));
          const res = await todolistsApi.createTodolist(title);
          return {
            ...res.data.data.item,
            filter: 'all' as const,
          };
        } catch (e) {
          return rejectWithValue(e);
        } finally {
          dispatch(changeStatusModeAC({ status: 'idle' }));
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift(action.payload);
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (payload: { id: string }, { rejectWithValue, dispatch }) => {
        try {
          dispatch(changeStatusModeAC({ status: 'loading' }));
          await todolistsApi.deleteTodolist(payload.id); // Предполагаем, что API принимает id напрямую
          return { id: payload.id };
        } catch (e) {
          return rejectWithValue(e);
        } finally {
          dispatch(changeStatusModeAC({ status: 'idle' }));
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todolist) => todolist.id === action.payload.id);
          if (index !== -1) {
            state.splice(index, 1);
          }
        },
      },
    ),
    fetchTodolistsTC: create.asyncThunk(
      async (_arg, { dispatch, rejectWithValue }) => {
        try {
          // on
          dispatch(changeStatusModeAC({ status: 'loading' }));
          const res = await todolistsApi.getTodolists();
          return { todolists: res.data };
        } catch (error) {
          return rejectWithValue(error);
        } finally {
          dispatch(changeStatusModeAC({ status: 'idle' }));
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((tl) => {
            state.push({ ...tl, filter: 'all' });
          });
        },
      },
    ),
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
});

export const todolistsReducer = todolistsSlice.reducer;
export const { changeTodolistFilterAC, fetchTodolistsTC, changeTodolistTitleTC, createTodolistTC, deleteTodolistTC } =
  todolistsSlice.actions;
export const { selectTodolists } = todolistsSlice.selectors;

export type DomainTodolist = Todolist & {
  filter: FilterValues;
};

export type FilterValues = 'all' | 'active' | 'completed';
