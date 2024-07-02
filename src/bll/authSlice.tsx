import { ResultCode } from 'api/task-api';
import { appActions } from 'bll/appSlice';
import { authApi, LoginParamsType } from 'api/auth-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';
import { todolistActions } from 'bll/todolistSlice';
import axios from 'axios';

export const loginTC = createAsyncThunk('auth/login', async (data: LoginParamsType, thunkAPI) => {
	const { dispatch } = thunkAPI;

	dispatch(appActions.setStatus({ status: 'loading' }));
	const res = await authApi.me(data);

	try {
		if (res.data.resultCode === ResultCode.SUCCESS) {
			dispatch(appActions.setStatus({ status: 'succeeded' }));
		} else {
			handleServerAppError(dispatch, res.data);
		}
	} catch (e) {
		if (axios.isAxiosError(e)) {
			handleServerNetworkError(dispatch, e.message);
		}
	}

	return { isAuth: true };
});

export const logoutTC = createAsyncThunk('auth/logout', async (arg, thunkAPI) => {
	const { dispatch } = thunkAPI;
	dispatch(appActions.setStatus({ status: 'loading' }));
	const res = await authApi.logout();
	try {
		if (res.data.resultCode === ResultCode.SUCCESS) {
			dispatch(appActions.setStatus({ status: 'succeeded' }));
			dispatch(appActions.clearAuthData());
			dispatch(todolistActions.clearTodos());
		} else {
			handleServerAppError(dispatch, res.data);
		}
	} catch (e) {
		if (axios.isAxiosError(e)) {
			handleServerNetworkError(dispatch, e.message);
		}
	}

	return { isAuth: false };
});

const initialState = {
	isAuth: false,
};

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(loginTC.fulfilled, (state, action) => {
			state.isAuth = action.payload.isAuth;
		});
		builder.addCase(logoutTC.fulfilled, (state, action) => {
			state.isAuth = action.payload.isAuth;
		});
	},
	selectors: {
		selectIsAuth: state => state.isAuth,
	},
});

export const authSlice = slice.reducer;
export const authActions = slice.actions;
export const { selectIsAuth } = slice.selectors;
