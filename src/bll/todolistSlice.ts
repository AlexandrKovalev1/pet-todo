import { ResultCode } from 'api/task-api';
import axios, { AxiosError } from 'axios';
import { appActions, RequestStatusType } from 'bll/appSlice';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todolistsApi, TodolistType } from 'api/todolists-api';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';
import { getTasksTC } from 'bll/tasksSlice';

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

export const getTodosTC = createAsyncThunk(`todoLists/get-todos`, async (arg, thunkAPI) => {
	thunkAPI.dispatch(appActions.setStatus({ status: 'loading' }));
	const res = await todolistsApi.getTodolists();
	try {
		thunkAPI.dispatch(appActions.setStatus({ status: 'succeeded' }));
		thunkAPI.dispatch(appActions.setStatus({ status: 'idle' }));
		res.data.forEach(tl => {
			thunkAPI.dispatch(getTasksTC(tl.id));
		});
	} catch (e) {
		if (axios.isAxiosError(e)) {
			handleServerNetworkError(thunkAPI.dispatch, e.message);
		} else {
			handleServerNetworkError(thunkAPI.dispatch, (e as Error).message);
		}
	}
	return { todolists: res.data };
});
export const addTodoTC = createAsyncThunk(`todoLists/add-todo`, async (title: string, thunkAPI) => {
	thunkAPI.dispatch(appActions.setStatus({ status: 'loading' }));
	const res = await todolistsApi.createTodolist(title);
	try {
		if (res.data.resultCode === ResultCode.SUCCESS) {
			thunkAPI.dispatch(appActions.setStatus({ status: 'succeeded' }));
		} else {
			handleServerAppError(thunkAPI.dispatch, res.data);
		}
	} catch (e) {
		if (axios.isAxiosError<ErrorCustomType>(e)) {
			handleServerNetworkError(thunkAPI.dispatch, e.message);
		} else {
			handleServerNetworkError(thunkAPI.dispatch, (e as Error).message);
		}
	}

	return { todolist: res.data.data.item };
});
export const deleteTodoListTC = createAsyncThunk(`todoLists/delete-todoList`, async (todoId: string, thunkAPI) => {
	thunkAPI.dispatch(appActions.setStatus({ status: 'loading' }));
	const res = await todolistsApi.deleteTodolist(todoId);
	try {
		if (res.data.resultCode === ResultCode.SUCCESS) {
			thunkAPI.dispatch(appActions.setStatus({ status: 'succeeded' }));
		} else {
			handleServerAppError(thunkAPI.dispatch, res.data);
		}
	} catch (e) {
		if (axios.isAxiosError<ErrorCustomType>(e)) {
			handleServerNetworkError(thunkAPI.dispatch, e.message);
		}
	}
	return { todoId };
});

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
		builder.addCase(getTodosTC.fulfilled, (state, action) => {
			action.payload.todolists.forEach(tl => {});
			return action.payload.todolists.map(todolist => ({ ...todolist, filter: 'All', entityStatus: 'idle' }));
		});
		builder.addCase(addTodoTC.fulfilled, (state, action) => {
			state.unshift({ ...action.payload.todolist, filter: 'All', entityStatus: 'idle' });
		});
		builder.addCase(deleteTodoListTC.fulfilled, (state, action) => {
			const index = state.findIndex(todo => todo.id === action.payload.todoId);
			if (index !== -1) {
				state.splice(index, 1);
			}
		});
	},

	selectors: {
		selectTodoLists: state => state,
	},
});

export const todolistActions = slice.actions;
export const todolistSlice = slice.reducer;
export const { selectTodoLists } = slice.selectors;
