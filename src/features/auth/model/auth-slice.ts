import { Inputs } from '@/features/auth/lib/schemas';
import { createAppSlice, handleServerNetworkError } from '@/common/utils';
import { authApi } from '@/features/auth/api/authApi.ts';
import { AUTH_TOKEN } from '@/common/constans/constans.ts';

export const authSlice = createAppSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: Inputs, { dispatch, rejectWithValue }) => {
        try {
          const res = await authApi.login(data);
          const token = res.data.data.token;
          localStorage.setItem(AUTH_TOKEN, token);
          return { isLoggedIn: true };
        } catch (error) {
          handleServerNetworkError(dispatch, error);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      },
    ),
  }),
});

export const { selectIsLoggedIn } = authSlice.selectors;
export const { loginTC } = authSlice.actions;
export const authReducer = authSlice.reducer;
