import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@/common/types';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
    status: 'loading' as RequestStatus,
  },
  reducers: (create) => ({
    // под  reducer - action
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode;
    }),
    changeStatusModeAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status;
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatusMode: (state) => state.status,
  },
});

export const appReducer = appSlice.reducer;
export const { changeThemeModeAC, changeStatusModeAC } = appSlice.actions;
export const { selectThemeMode, selectStatusMode } = appSlice.selectors;
export type ThemeMode = 'dark' | 'light';
