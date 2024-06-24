import { Dispatch } from 'redux';
import { authApi, LoginParamsType } from '../api/auth-api';
import { ResultCode } from '../api/task-api';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';

let InitialState: AppStateType = {
	status: 'idle',
	error: null,
	isAuth: false,
	id: null,
	login: null,
	email: null,
	initialized: false
};

export const appReducer = (
	state: AppStateType = InitialState,
	action: AppReducerActionType
): AppStateType => {
	switch (action.type) {
		case 'SET_STATUS': {
				return { ...state, status: action.status };

		}
		case 'SET_ISERROR': {
			return { ...state, error: action.error };
		}
		case 'APP/SET-AUTH-DATA': {
			return {
				...state,
				...action.data
			};
		}
		case 'APP/SET-IS_AUTH': {
			return {
				...state, isAuth: action.isAuth
			};
		}
		case 'APP/SET-APP-INITIALIZED':{
			return {
				...state,
				initialized:action.initialized
			}
		}
		default:
			return state;
	}
};

//Action Creators
export const setStatusAC = (status: RequestStatusType) =>
	({ type: 'SET_STATUS', status }) as const;

export const setErrorAC = (error: string|null) =>
	({
		type: 'SET_ISERROR',
		error
	}) as const;

export const setAuthDataAC = (data: {
	id: number,
	email: string,
	login: string
}) => (
	{ type: 'APP/SET-AUTH-DATA', data } as const);

export const setIsAuthAC = (isAuth: boolean) => (
	{ type: 'APP/SET-IS_AUTH', isAuth } as const);

export const setAppInitializedAC = (initialized: boolean) => (
	{ type: 'APP/SET-APP-INITIALIZED', initialized } as const);
//thunk

export const initializeAppTC = () =>(dispatch:Dispatch)=>{
	dispatch(setStatusAC('loading'));
 authApi.getIsAuth().then((res)=>{
	 if (res.data.resultCode === ResultCode.SUCCESS) {
		 dispatch(setStatusAC('succeeded'));
		 dispatch(setAuthDataAC(res.data.data));
		 dispatch(setIsAuthAC(true));

	 } else {
		 handleServerAppError(dispatch, res.data);
	 }
 }).catch((e)=>{
		handleServerNetworkError(dispatch, e.message);
	}).finally(()=>{
	 dispatch(setAppInitializedAC(true))
 })
}

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
	dispatch(setStatusAC('loading'));
	authApi.login(data).then(res => {
		if (res.data.resultCode === ResultCode.SUCCESS) {
			dispatch(setStatusAC('succeeded'));
			dispatch(setIsAuthAC(true))
		} else {
			handleServerAppError(dispatch, res.data);
		}
	}).catch(e => handleServerNetworkError(dispatch, e.message));
};

export const logoutTC = () => (dispatch: Dispatch) => {
	dispatch(setStatusAC('loading'));
	authApi.logout().then(res => {
		if (res.data.resultCode === ResultCode.SUCCESS) {
			dispatch(setStatusAC('succeeded'));
			dispatch(setIsAuthAC(false))
		} else {
			handleServerAppError(dispatch, res.data);
		}
	}).catch(e => handleServerNetworkError(dispatch, e));
};

//types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AppReducerActionType = SetStatusType
	| SetErrorType
	| SetIsAuthType
	| SetAuthDataType
	| SetAppInitializedType;
export type AppStateType = {
	status: RequestStatusType;
	error: string | null;
	isAuth: boolean
	id: number | null
	email: string | null
	login: string | null
	initialized: boolean
};

export type SetErrorType = ReturnType<typeof setErrorAC>;
export type SetIsAuthType = ReturnType<typeof setIsAuthAC>
export type SetStatusType = ReturnType<typeof setStatusAC>;
export type SetAuthDataType = ReturnType<typeof setAuthDataAC>
export type SetAppInitializedType = ReturnType<typeof setAppInitializedAC>
