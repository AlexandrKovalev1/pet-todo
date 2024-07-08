import { authApi } from 'api/auth-api';
import { ResultCode } from 'api/task-api';
import { authActions } from 'bll/authSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';
import { createAppAsyncThunk } from 'utils/createAppAsyncThunk';

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
		builder.addCase(initializeApp.fulfilled, (state, action) => {
			if (action.payload) {
				state.id = action.payload.data.id;
				state.login = action.payload.data.login;
				state.email = action.payload.data.email;
			}
		});
	},
	selectors: {
		selectIsInitialized: state => state.initialized,
		selectError: state => state.error,
		selectLogin: state => state.login,
		selectAppStatus: state => state.status,
	},
});
//thunks
const initializeApp = createAppAsyncThunk(
	`${slice.name}/initialize-app`,
	async (arg, { dispatch, rejectWithValue }) => {
		dispatch(appActions.setStatus({ status: 'loading' }));

		try {
			const res = await authApi.getIsAuth();
			if (res.data.resultCode === ResultCode.SUCCESS) {
				dispatch(appActions.setStatus({ status: 'succeeded' }));
				dispatch(authActions.setIsLoggedIn({ isAuth: true }));
				return { data: res.data.data };
			} else {
				handleServerAppError(dispatch, res.data);
				return rejectWithValue({ error: res.data.messages[0] });
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch);
		} finally {
			dispatch(appActions.setAppInitialized({ isInitialized: true }));
		}
	},
);
//types
export type AppStateType = {
	status: RequestStatusType;
	error: string | null;
	id: number | null;
	email: string | null;
	login: string | null;
	initialized: boolean;
};
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
//exports
export const appSlice = slice.reducer;
export const appActions = slice.actions;
export const appThunks = { initializeApp };
export const { selectIsInitialized, selectError, selectLogin, selectAppStatus } = slice.selectors;
