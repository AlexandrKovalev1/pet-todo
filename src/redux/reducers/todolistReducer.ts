import { v4 } from 'uuid';
import { todolistsApi, TodolistType } from '../../api/todolists-api';
import { DispatchType } from '../store/store';

export type FilterType = 'All' | 'Active' | 'Completed';

export type TodolistDomainType = TodolistType & {
	filter: FilterType;
};

let initialState: TodolistDomainType[] = [];

type ActionType =
	| SetTodoListsType
	| DeleteTodoType
	| AddTodolistType
	| EditTitleType
	| SetFilterTodolistType;
export const todolistReducer = (
	state: TodolistDomainType[] = initialState,
	action: ActionType,
): TodolistDomainType[] => {
	switch (action.type) {
		case 'SET-TODOLISTS': {
			return action.todolists.map(todo => ({ ...todo, filter: 'All' }));
		}
		case 'DELETE-TODO': {
			return state.filter(todo => todo.id !== action.todoId);
		}
		case 'ADD-TODOLIST': {
			let todo: TodolistDomainType = {
				id: action.todoid,
				title: action.title,
				addedDate: '',
				order: 0,
				filter: 'All',
			};
			return [...state, todo];
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

export type DeleteTodoType = ReturnType<typeof deleteTodoAC>;
export const deleteTodoAC = (todoId: string) => {
	return {
		type: 'DELETE-TODO',
		todoId,
	} as const;
};
export type SetTodoListsType = ReturnType<typeof setTodoListsAC>;
export const setTodoListsAC = (todolists: TodolistType[]) => {
	return {
		type: 'SET-TODOLISTS',
		todolists,
	} as const;
};

export type AddTodolistType = ReturnType<typeof addTodoAC>;
export const addTodoAC = (title: string) => {
	let todoid = v4();
	return {
		type: 'ADD-TODOLIST',
		title,
		todoid,
	} as const;
};

type EditTitleType = ReturnType<typeof editTitleTodoAC>;
export const editTitleTodoAC = (todoId: string, newTitle: string) => {
	return {
		type: 'EDIT-TITLE',
		newTitle,
		todoId,
	} as const;
};

type SetFilterTodolistType = ReturnType<typeof setFilterTodolistAC>;
export const setFilterTodolistAC = (todoId: string, filter: FilterType) => {
	return {
		type: 'SET-FILTER',
		filter,
		todoId,
	} as const;
};

export const getTodosTC = () => (dispatch: DispatchType) => {
	todolistsApi.getTodolists().then(res => dispatch(setTodoListsAC(res.data)));
};
