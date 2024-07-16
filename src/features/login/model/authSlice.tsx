import { ResultCode } from 'features/task/api/task-api';
import { appActions } from 'app/appSlice';
import { todolistActions } from 'features/todos/model/_tests_/todolistSlice';
import { authApi, UserDataType } from 'features/login/api/auth-api';
import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils';
import { LoginParamsType } from 'features/login/api/authApi.types';

const slice = createSlice({
	name: 'auth',
	initialState: {
		isAuth: false,
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.isAuth = action.payload.isAuth;
		});
		builder.addCase(logout.fulfilled, (state, action) => {
			state.isAuth = action.payload.isAuth;
		});
		builder.addCase(initializeApp.fulfilled, (state, action) => {
			state.isAuth = action.payload.isAuth;
		});
	},
	selectors: {
		selectIsAuth: state => state.isAuth,
	},
});
//thunks
const login = createAppAsyncThunk<{ isAuth: boolean }, LoginParamsType>(
	`${slice.name}/login`,
	async (params: LoginParamsType, { dispatch, rejectWithValue }) => {
		dispatch(appActions.setStatus({ status: 'loading' }));
		try {
			const res = await authApi.me(params);
			if (res.data.resultCode === ResultCode.SUCCESS) {
				dispatch(appActions.setStatus({ status: 'succeeded' }));
				return { isAuth: true };
			} else {
				handleServerAppError(dispatch, res.data);

				return rejectWithValue(res.data);
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch);
			return { isAuth: false };
		}
	},
);

const logout = createAppAsyncThunk<{ isAuth: boolean }, void>(
	`${slice.name}/logout`,
	async (_, { dispatch, rejectWithValue }) => {
		dispatch(appActions.setStatus({ status: 'loading' }));
		try {
			const res = await authApi.logout();
			if (res.data.resultCode === ResultCode.SUCCESS) {
				dispatch(appActions.setStatus({ status: 'succeeded' }));
				dispatch(appActions.clearAuthData());
				dispatch(todolistActions.clearTodos());
				return { isAuth: false };
			} else {
				handleServerAppError(dispatch, res.data);
				return rejectWithValue({ error: res.data.messages[0] });
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch);
			return rejectWithValue(null);
		}
	},
);

const initializeApp = createAppAsyncThunk<{ isAuth: boolean }, void>(
	`${slice.name}/initialize-app`,
	async (_, { dispatch, rejectWithValue }) => {
		dispatch(appActions.setStatus({ status: 'loading' }));

		try {
			const res = await authApi.getIsAuth();
			if (res.data.resultCode === ResultCode.SUCCESS) {
				dispatch(appActions.setStatus({ status: 'succeeded' }));
				dispatch(appActions.setUserData({ ...res.data.data }));
				return { isAuth: true };
			} else {
				dispatch(appActions.setStatus({ status: 'succeeded' }));
				// handleServerAppError(dispatch, res.data);
				return rejectWithValue({ error: res.data.messages[0] });
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch);
			return rejectWithValue(null);
		} finally {
			dispatch(appActions.setAppInitialized({ isInitialized: true }));
		}
	},
);
//exports
export const authSlice = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logout, initializeApp };
export const { selectIsAuth } = slice.selectors;
