import { authApi } from 'api/auth-api';
import { ResultCode } from 'api/task-api';
import { authActions } from 'bll/authSlice';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';
import axios from 'axios';

type UserType = {
	id: number;
	email: string;
	login: string;
};
export type AppStateType = {
	status: RequestStatusType;
	error: string | null;
	id: number | null;
	email: string | null;
	login: string | null;
	initialized: boolean;
};
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export const initializeAppTC = createAsyncThunk(`app/initialize-app`, async (arg, thunkAPI) => {
	const { dispatch } = thunkAPI;

	dispatch(appActions.setStatus({ status: 'loading' }));
	const res = await authApi.getIsAuth();
	try {
		if (res.data.resultCode === ResultCode.SUCCESS) {
			dispatch(appActions.setStatus({ status: 'succeeded' }));
		} else {
			handleServerAppError(dispatch, res.data);
		}
	} catch (e) {
		if (axios.isAxiosError(e)) {
			handleServerNetworkError(dispatch, e.message);
		} else {
			handleServerNetworkError(dispatch, (e as Error).message);
		}
	} finally {
		dispatch(appActions.setAppInitialized({ isInitialized: true }));
	}

	return { data: res.data.data };
});

const initialState = {
	status: 'idle',
	error: null as string | null,
	id: null as null | number,
	login: null as null | string,
	email: null as null | string,
	initialized: false,
};

const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
			state.status = action.payload.status;
		},
		setError(state, action: PayloadAction<{ error: string | null }>) {
			state.error = action.payload.error;
		},
		setAppInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
			state.initialized = action.payload.isInitialized;
		},
		clearAuthData(state) {
			state.id = null;
			state.login = null;
			state.email = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(initializeAppTC.fulfilled, (state, action) => {
			state.id = action.payload.data.id;
			state.login = action.payload.data.login;
			state.email = action.payload.data.email;
		});
	},
	selectors: {
		selectIsInitialized: state => state.initialized,
		selectError: state => state.error,
		selectLogin: state => state.login,
		selectAppStatus: state => state.status,
	},
});

export const appSlice = slice.reducer;
export const appActions = slice.actions;
export const { selectIsInitialized, selectError, selectLogin, selectAppStatus } = slice.selectors;
