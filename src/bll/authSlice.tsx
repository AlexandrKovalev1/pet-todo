import { Dispatch } from 'redux';
import { ResultCode } from 'api/task-api';
import { appActions } from 'bll/appSlice';
import { authApi, LoginParamsType } from 'api/auth-api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';

const initialState = {
	isAuth: false,
};

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuth(state, action: PayloadAction<{ isAuth: boolean }>) {
			state.isAuth = action.payload.isAuth;
		},
	},
});

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
	dispatch(appActions.setStatus({ status: 'loading' }));
	authApi
		.me(data)
		.then(res => {
			if (res.data.resultCode === ResultCode.SUCCESS) {
				dispatch(appActions.setStatus({ status: 'succeeded' }));
				dispatch(authActions.setIsAuth({ isAuth: true }));
			} else {
				handleServerAppError(dispatch, res.data);
			}
		})
		.catch(e => handleServerNetworkError(dispatch, e.message));
};
export const logoutTC = () => (dispatch: Dispatch) => {
	dispatch(appActions.setStatus({ status: 'loading' }));
	authApi
		.logout()
		.then(res => {
			if (res.data.resultCode === ResultCode.SUCCESS) {
				dispatch(appActions.setStatus({ status: 'succeeded' }));
				dispatch(authActions.setIsAuth({ isAuth: false }));
			} else {
				handleServerAppError(dispatch, res.data);
			}
		})
		.catch(e => handleServerNetworkError(dispatch, e));
};

export const authSlice = slice.reducer;
export const authActions = slice.actions;
