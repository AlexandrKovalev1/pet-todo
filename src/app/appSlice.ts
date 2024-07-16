import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null as string | null,
  id: null as null | number,
  login: null as null | string,
  email: null as null | string,
  initialized: false,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
    setError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppInitialized(
      state,
      action: PayloadAction<{ isInitialized: boolean }>,
    ) {
      state.initialized = action.payload.isInitialized;
    },
    clearAuthData(state) {
      state.id = null;
      state.login = null;
      state.email = null;
    },
    setUserData(
      state,
      action: PayloadAction<{
        id: number;
        email: string;
        login: string;
      }>,
    ) {
      const { id, login, email } = action.payload;
      state.id = id;
      state.login = login;
      state.email = email;
    },
  },
  selectors: {
    selectIsInitialized: (state) => state.initialized,
    selectError: (state) => state.error,
    selectLogin: (state) => state.login,
    selectAppStatus: (state) => state.status,
  },
});
//thunks

//types
export type AppStateType = {
  status: RequestStatusType;
  error: string | null;
  id: number | null;
  email: string | null;
  login: string | null;
  initialized: boolean;
};
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
//exports
export const appSlice = slice.reducer;
export const appActions = slice.actions;
export const {
  selectIsInitialized,
  selectError,
  selectLogin,
  selectAppStatus,
} = slice.selectors;
