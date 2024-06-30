import { AppThunkType } from 'app/store';
import { ResultCode } from 'api/task-api';
import axios, { AxiosError } from 'axios';
import { appActions, RequestStatusType } from 'bll/appSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todolistsApi, TodolistType } from 'api/todolists-api';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';

type ErrorCustomType = {
	statusCode: 0;
	messages: [
		{
			message: string;
			field: string;
		},
	];
	error: string;
};
export type TodolistDomainType = TodolistType & {
	filter: FilterType;
	entityStatus: RequestStatusType;
};
export type FilterType = 'All' | 'Active' | 'Completed';

const initialState = [] as TodolistDomainType[];

const slice = createSlice({
	name: 'todolists',
	initialState,
	reducers: {
		setTodoLists(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
			return action.payload.todolists.map(todolist => ({ ...todolist, filter: 'All', entityStatus: 'idle' }));
		},
		addTodo(state, action: PayloadAction<{ todolist: TodolistType }>) {
			state.unshift({ ...action.payload.todolist, filter: 'All', entityStatus: 'idle' });
		},
		editTitleTodo(state, action: PayloadAction<{ todoId: string; newTitle: string }>) {
			const todoIndex = state.findIndex(todo => todo.id === action.payload.todoId);
			if (todoIndex !== -1) {
				state[todoIndex].title = action.payload.newTitle;
			}
		},
		setFilterTodolist(state, action: PayloadAction<{ todoId: string; filter: FilterType }>) {
			const todoIndex = state.findIndex(todo => todo.id === action.payload.todoId);
			if (todoIndex !== -1) {
				state[todoIndex].filter = action.payload.filter;
			}
		},
		deleteTodo(state, action: PayloadAction<{ todoId: string }>) {
			const index = state.findIndex(todo => todo.id === action.payload.todoId);
			if (index !== -1) {
				state.splice(index, 1);
			}
		},
	},
});

export const getTodosTC = (): AppThunkType => async dispatch => {
	dispatch(appActions.setStatus({ status: 'loading' }));
	const res = await todolistsApi.getTodolists();
	try {
		dispatch(todolistActions.setTodoLists({ todolists: res.data }));
		dispatch(appActions.setStatus({ status: 'succeeded' }));
		dispatch(appActions.setStatus({ status: 'idle' }));
	} catch (e) {
		if (axios.isAxiosError(e)) {
			handleServerNetworkError(dispatch, e.message);
		} else {
			handleServerNetworkError(dispatch, (e as Error).message);
		}
	}
};

export const addTodoTC =
	(title: string): AppThunkType =>
	async dispatch => {
		dispatch(appActions.setStatus({ status: 'loading' }));
		const res = await todolistsApi.createTodolist(title);
		try {
			if (res.data.resultCode === ResultCode.SUCCESS) {
				dispatch(todolistActions.addTodo({ todolist: res.data.data.item }));
				dispatch(appActions.setStatus({ status: 'succeeded' }));
			} else {
				handleServerAppError(dispatch, res.data);
			}
		} catch (e) {
			if (axios.isAxiosError<ErrorCustomType>(e)) {
				handleServerNetworkError(dispatch, e.message);
			} else {
				handleServerNetworkError(dispatch, (e as Error).message);
			}
		}
	};

export const deleteTodoListTC =
	(todoId: string): AppThunkType =>
	dispatch => {
		dispatch(appActions.setStatus({ status: 'loading' }));
		todolistsApi
			.deleteTodolist(todoId)
			.then(res => {
				if (res.data.resultCode === ResultCode.SUCCESS) {
					dispatch(todolistActions.deleteTodo({ todoId }));
					dispatch(appActions.setStatus({ status: 'succeeded' }));
				} else {
					handleServerAppError(dispatch, res.data);
				}
			})
			.catch((e: AxiosError<ErrorCustomType>) => {
				handleServerNetworkError(dispatch, e.message);
			});
	};

export const todolistActions = slice.actions;
export const todolistSlice = slice.reducer;
