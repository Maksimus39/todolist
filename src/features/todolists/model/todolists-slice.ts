import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { Todolist } from '@/features/todolists/api/todolistsApi.types.ts';
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts';

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    return {
      setTodolistsAC: create.reducer<{ todolists: Todolist[] }>((_state, action) => {
        return action.payload.todolists.map((tl) => {
          return { ...tl, filter: 'all' };
        });
      }),
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
      changeTodolistTitleAC: create.reducer<{
        id: string;
        title: string;
      }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id);
        if (index !== -1) {
          state[index].title = action.payload.title;
        }
      }),
      changeTodolistFilterAC: create.reducer<{
        id: string;
        filter: FilterValues;
      }>((state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.id);
        if (todolist) {
          todolist.filter = action.payload.filter;
        }
      }),
    };
  },
  selectors: {
    selectTodolists: (state) => state,
  },
});

export const fetchTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/fetchTodolistsTC`,
  async (_arg, { dispatch, rejectWithValue }) => {
    try {
      const res = await todolistsApi.getTodolists();
      dispatch(setTodolistsAC({ todolists: res.data }));
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
export const todolistsReducer = todolistsSlice.reducer;
export const {
  deleteTodolistAC,
  createTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  setTodolistsAC,
} = todolistsSlice.actions;

export const { selectTodolists } = todolistsSlice.selectors;

export type DomainTodolist = Todolist & {
  filter: FilterValues;
};

export type FilterValues = 'all' | 'active' | 'completed';
