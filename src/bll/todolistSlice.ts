import axios from 'axios';
import { ResultCode } from 'api/task-api';

import { appActions, RequestStatusType } from 'bll/appSlice';
import { todolistsApi, TodolistType } from 'api/todolists-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';
import { tasksThunks } from 'bll/tasksSlice';
import { createAppAsyncThunk } from 'utils/createAppAsyncThunk';

const initialState = [] as TodolistDomainType[];

const slice = createSlice({
	name: 'todoLists',
	initialState,
	reducers: {
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
		clearTodos() {
			return [];
		},
	},
	extraReducers: builder => {
		builder.addCase(getTodos.fulfilled, (state, action) => {
			if (action.payload) {
				action.payload.todolists.forEach(tl => {});
				return action.payload.todolists.map(todolist => ({ ...todolist, filter: 'All', entityStatus: 'idle' }));
			}
		});
		builder.addCase(addTodo.fulfilled, (state, action) => {
			if (action.payload) {
				state.unshift({ ...action.payload.todolist, filter: 'All', entityStatus: 'idle' });
			}
		});
		builder.addCase(deleteTodoList.fulfilled, (state, action) => {
			if (action.payload) {
				const index = state.findIndex(todo => todo.id === action.payload!.todoId);
				if (index !== -1) {
					state.splice(index, 1);
				}
			}
		});
	},

	selectors: {
		selectTodoLists: state => state,
	},
});
//thunks
const getTodos = createAppAsyncThunk(`${slice.name}/get-todos`, async (arg, { dispatch, rejectWithValue }) => {
	dispatch(appActions.setStatus({ status: 'loading' }));

	try {
		const res = await todolistsApi.getTodolists();
		dispatch(appActions.setStatus({ status: 'succeeded' }));
		dispatch(appActions.setStatus({ status: 'idle' }));
		res.data.forEach(tl => {
			dispatch(tasksThunks.getTasks(tl.id));
		});
		return { todolists: res.data };
	} catch (e) {
		handleServerNetworkError(e, dispatch);
		return rejectWithValue(null);
	}
});
const addTodo = createAppAsyncThunk(`${slice.name}/add-todo`, async (title: string, { dispatch, rejectWithValue }) => {
	dispatch(appActions.setStatus({ status: 'loading' }));

	try {
		const res = await todolistsApi.createTodolist(title);
		if (res.data.resultCode === ResultCode.SUCCESS) {
			dispatch(appActions.setStatus({ status: 'succeeded' }));
			return { todolist: res.data.data.item };
		} else {
			handleServerAppError(dispatch, res.data);
		}
	} catch (e) {
		handleServerNetworkError(e, dispatch);
		return rejectWithValue(null);
	}
});
const deleteTodoList = createAppAsyncThunk(
	`${slice.name}/delete-todoList`,
	async (todoId: string, { dispatch, rejectWithValue }) => {
		dispatch(appActions.setStatus({ status: 'loading' }));

		try {
			const res = await todolistsApi.deleteTodolist(todoId);
			if (res.data.resultCode === ResultCode.SUCCESS) {
				dispatch(appActions.setStatus({ status: 'succeeded' }));
				return { todoId };
			} else {
				handleServerAppError(dispatch, res.data);
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch);
			return rejectWithValue(null);
		}
	},
);
//types
export type TodolistDomainType = TodolistType & {
	filter: FilterType;
	entityStatus: RequestStatusType;
};
export type FilterType = 'All' | 'Active' | 'Completed';
//exports
export const todolistActions = slice.actions;
export const todoListThunks = { getTodos, addTodo, deleteTodoList };
export const todolistSlice = slice.reducer;
export const { selectTodoLists } = slice.selectors;
