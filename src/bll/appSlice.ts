import { Dispatch } from 'redux';
import { authApi } from 'api/auth-api';
import { ResultCode } from 'api/task-api';
import { authActions } from 'bll/authSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';

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
		setAuthData(state, action: PayloadAction<{ data: UserType }>) {
			state.id = action.payload.data.id;
			state.login = action.payload.data.login;
			state.email = action.payload.data.email;
		},
		setAppInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
			state.initialized = action.payload.isInitialized;
		},
	},
});

export const initializeAppTC = () => (dispatch: Dispatch) => {
	dispatch(appActions.setStatus({ status: 'loading' }));
	authApi
		.getIsAuth()
		.then(res => {
			if (res.data.resultCode === ResultCode.SUCCESS) {
				dispatch(appActions.setStatus({ status: 'succeeded' }));
				dispatch(appActions.setAuthData({ data: res.data.data }));
				dispatch(authActions.setIsAuth({ isAuth: true }));
			} else {
				handleServerAppError(dispatch, res.data);
			}
		})
		.catch(e => {
			handleServerNetworkError(dispatch, e.message);
		})
		.finally(() => {
			dispatch(appActions.setAppInitialized({ isInitialized: true }));
		});
};

export const appSlice = slice.reducer;
export const appActions = slice.actions;
