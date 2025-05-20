import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { Todolist } from '@/features/todolists/api/todolistsApi.types.ts';
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts';
import { createAppSlice } from '@/common/utils';
import { changeStatusModeAC } from '@/app/app-slice.ts';

export const todolistsSlice = createAppSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }),
    createTodolistAC: create.preparedReducer(
      (title: string) => {
        const newTodolist: DomainTodolist = {
          title,
          id: nanoid(),
          filter: 'all',
          order: 1,
          addedDate: '',
        };
        return {
          payload: newTodolist,
        };
      },
      (state, action) => {
        state.push(action.payload);
      },
    ),
    changeTodolistFilterAC: create.reducer<{
      id: string;
      filter: FilterValues;
    }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    }),
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
  extraReducers: (builder) => {
    builder
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id);
        if (index !== -1) {
          state[index].title = action.payload.title;
        }
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.unshift(action.payload); // добавляем новый тудулист в начало массива
      })
      // Добавляем обработчик для deleteTodolistTC
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id);
        if (index !== -1) {
          state.splice(index, 1);
        }
      })
      .addCase(deleteTodolistTC.rejected, (_, action) => {
        console.error('Delete todolist failed:', action.payload);
      });
  },
});

// изменение названия тудулиста
export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.changeTodolistTitle(payload);
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
// создание тудулиста
export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTC`,
  async (title: string, { rejectWithValue, dispatch }) => {
    // Принимаем строку, а не объект
    try {
      dispatch(changeStatusModeAC({ status: 'loading' }));
      const res = await todolistsApi.createTodolist(title); // Передаём строку
      dispatch(changeStatusModeAC({ status: 'succeeded' }));
      return {
        ...res.data.data.item,
        filter: 'all' as const,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
// Удаление тудулиста
export const deleteTodolistTC = createAsyncThunk(
  // Возвращаемый тип
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (payload: { id: string }, thunkAPI) => {
    try {
      await todolistsApi.deleteTodolist(payload.id); // Предполагаем, что API принимает id напрямую
      return { id: payload.id };
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to delete todolist');
    }
  },
);

export const todolistsReducer = todolistsSlice.reducer;
export const { deleteTodolistAC, createTodolistAC, changeTodolistFilterAC, fetchTodolistsTC } = todolistsSlice.actions;
export const { selectTodolists } = todolistsSlice.selectors;

export type DomainTodolist = Todolist & {
  filter: FilterValues;
};

export type FilterValues = 'all' | 'active' | 'completed';
