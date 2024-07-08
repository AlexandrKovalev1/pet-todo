import axios from 'axios';
import { ResultCode } from 'api/task-api';
import { appActions } from 'bll/appSlice';
import { todolistActions } from 'bll/todolistSlice';
import { authApi, LoginParamsType } from 'api/auth-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';
import { createAppAsyncThunk } from 'utils/createAppAsyncThunk';

const slice = createSlice({
	name: 'auth',
	initialState: {
		isAuth: false,
	},
	reducers: {
		setIsLoggedIn: (state, action) => {
			state.isAuth = action.payload.isAuth;
		},
	},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.isAuth = true;
		});
		builder.addCase(logout.fulfilled, (state, action) => {
			state.isAuth = false;
		});
	},
	selectors: {
		selectIsAuth: state => state.isAuth,
	},
});
//thunks
const login = createAppAsyncThunk(
	`${slice.name}/login`,
	async (params: LoginParamsType, { dispatch, rejectWithValue }) => {
		dispatch(appActions.setStatus({ status: 'loading' }));
		try {
			const res = await authApi.me(params);
			if (res.data.resultCode === ResultCode.SUCCESS) {
				dispatch(appActions.setStatus({ status: 'succeeded' }));
				return;
			} else {
				handleServerAppError(dispatch, res.data);
				return rejectWithValue({ error: res.data.messages[0] });
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch);
			return { isAuth: false };
		}
	},
);
const logout = createAppAsyncThunk(`${slice.name}/logout`, async (arg, { dispatch, rejectWithValue }) => {
	dispatch(appActions.setStatus({ status: 'loading' }));
	try {
		const res = await authApi.logout();
		if (res.data.resultCode === ResultCode.SUCCESS) {
			dispatch(appActions.setStatus({ status: 'succeeded' }));
			dispatch(appActions.clearAuthData());
			dispatch(todolistActions.clearTodos());
			return;
		} else {
			handleServerAppError(dispatch, res.data);
			return rejectWithValue({ error: res.data.messages[0] });
		}
	} catch (e) {
		handleServerNetworkError(e, dispatch);
		return rejectWithValue(null);
	}
});
//exports
export const authSlice = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logout };
export const { selectIsAuth } = slice.selectors;
