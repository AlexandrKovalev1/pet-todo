import { todolistsApi, TodolistType } from '../api/todolists-api';
import { RequestStatusType, setStatusAC } from './appReducer';
import { AppThunkType } from '../app/store';
import { ResultCode } from '../api/task-api';
import {
	handleServerAppError,
	handleServerNetworkError,
} from '../utils/error-utils';
import axios, { AxiosError } from 'axios';

let initialState: TodolistDomainType[] = [];

export const todolistReducer = (
	state: TodolistDomainType[] = initialState,
	action: TodolistsActionType,
): TodolistDomainType[] => {
	switch (action.type) {
		case 'SET-TODOLISTS': {
			return action.todolists.map(todo => ({
				...todo,
				filter: 'All',
				entityStatus: 'idle',
			}));
		}
		case 'DELETE-TODO': {
			return state.filter(todo => todo.id !== action.todoId);
		}
		case 'ADD-TODOLIST': {
			let todo: TodolistDomainType = {
				...action.todoList,
				filter: 'All',
				entityStatus: 'idle',
			};
			return [todo, ...state];
		}
		case 'EDIT-TITLE': {
			return state.map(todo =>
				todo.id === action.todoId ? { ...todo, title: action.newTitle } : todo,
			);
		}
		case 'SET-FILTER': {
			return state.map(todo =>
				todo.id === action.todoId ? { ...todo, filter: action.filter } : todo,
			);
		}
		default:
			return state;
	}
};

//Action Creators
export const deleteTodoAC = (todoId: string) =>
	({
		type: 'DELETE-TODO',
		todoId,
	}) as const;
export const setTodoListsAC = (todolists: TodolistType[]) =>
	({
		type: 'SET-TODOLISTS',
		todolists,
	}) as const;
export const addTodoAC = (todoList: TodolistType) =>
	({
		type: 'ADD-TODOLIST',
		todoList,
	}) as const;
export const editTitleTodoAC = (todoId: string, newTitle: string) =>
	({
		type: 'EDIT-TITLE',
		newTitle,
		todoId,
	}) as const;

export const setFilterTodolistAC = (todoId: string, filter: FilterType) =>
	({
		type: 'SET-FILTER',
		filter,
		todoId,
	}) as const;

//Thunk Creators

export const getTodosTC = (): AppThunkType => async dispatch => {
	dispatch(setStatusAC('loading'));
	const res = await todolistsApi.getTodolists();
	try {
		dispatch(setTodoListsAC(res.data));
		dispatch(setStatusAC('succeeded'));
		dispatch(setStatusAC('idle'));
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
		dispatch(setStatusAC('loading'));
		const res = await todolistsApi.createTodolist(title);
		try {
			if (res.data.resultCode === ResultCode.SUCCESS) {
				dispatch(addTodoAC(res.data.data.item));
				dispatch(setStatusAC('succeeded'));
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
		dispatch(setStatusAC('loading'));
		todolistsApi
			.deleteTodolist(todoId)
			.then(res => {
				if (res.data.resultCode === ResultCode.SUCCESS) {
					dispatch(deleteTodoAC(todoId));
					dispatch(setStatusAC('succeeded'));
				} else {
					handleServerAppError(dispatch, res.data);
				}
			})
			.catch((e: AxiosError<ErrorCustomType>) => {
				handleServerNetworkError(dispatch, e.message);
			});
	};

//types
export type FilterType = 'All' | 'Active' | 'Completed';

export type TodolistDomainType = TodolistType & {
	filter: FilterType;
	entityStatus: RequestStatusType;
};

export type TodolistsActionType =
	| SetTodoListsType
	| DeleteTodoType
	| AddTodolistType
	| EditTitleType
	| SetFilterTodolistType;

type EditTitleType = ReturnType<typeof editTitleTodoAC>;
export type AddTodolistType = ReturnType<typeof addTodoAC>;
export type DeleteTodoType = ReturnType<typeof deleteTodoAC>;
export type SetTodoListsType = ReturnType<typeof setTodoListsAC>;
type SetFilterTodolistType = ReturnType<typeof setFilterTodolistAC>;

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
