import { v4 } from 'uuid';

export type FilterType = 'All' | 'Active' | 'Completed';

export type TodolistType = {
	id: string;
	title: string;
	filter: FilterType;
};

let initialState: TodolistType[] = [];

type ActionType =
	| DeleteTodoType
	| AddTodolistType
	| EditTitleType
	| SetFilterTodolistType;
export const todolistReducer = (
	state: TodolistType[] = initialState,
	action: ActionType,
): TodolistType[] => {
	switch (action.type) {
		case 'DELETE-TODO': {
			return state.filter(todo => todo.id !== action.todoId);
		}
		case 'ADD-TODOLIST': {
			let todo: TodolistType = {
				id: action.todoid,
				title: action.title,
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
