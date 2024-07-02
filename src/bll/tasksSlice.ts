import axios from 'axios';
import { addTodoTC, deleteTodoListTC, todolistActions } from 'bll/todolistSlice';
import { appActions, RequestStatusType } from 'bll/appSlice';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tasksApi, TaskSettingType, TaskType, UpdateModelType } from 'api/task-api';

export type TasksType = {
	[key: string]: TaskDomainType[];
};
export type TaskDomainType = TaskType & {
	entityStatus: RequestStatusType;
};

export const getTasksTC = createAsyncThunk(`tasks/get-tasks`, async (todoId: string, thunkAPI) => {
	thunkAPI.dispatch(appActions.setStatus({ status: 'loading' }));
	const res = await tasksApi.getTasks(todoId);
	try {
		thunkAPI.dispatch(appActions.setStatus({ status: 'succeeded' }));
	} catch (e) {
		if (axios.isAxiosError(e)) {
			thunkAPI.dispatch(appActions.setError({ error: e.message }));
		} else {
			thunkAPI.dispatch(appActions.setError({ error: (e as Error).message }));
		}
	} finally {
		thunkAPI.dispatch(appActions.setStatus({ status: 'idle' }));
	}
	return { todoId, tasks: res.data.items };
});
export const addTaskTC = createAsyncThunk(
	`tasks/add-task`,
	async (params: { todoId: string; title: string }, thunkApi) => {
		const { todoId, title } = params;
		thunkApi.dispatch(appActions.setStatus({ status: 'loading' }));
		const res = await tasksApi.createTask(todoId, title);
		const data = res.data;
		try {
			thunkApi.dispatch(appActions.setStatus({ status: 'succeeded' }));
		} catch (e) {
		} finally {
			thunkApi.dispatch(appActions.setStatus({ status: 'idle' }));
		}
		return { task: data.data.item };
	},
);
export const deleteTaskTC = createAsyncThunk(
	`tasks/delete-task`,
	async (params: { todoId: string; taskId: string }, thunkApi) => {
		const { todoId, taskId } = params;
		thunkApi.dispatch(tasksActions.setStatusTask({ todoId, taskId, status: 'loading' }));
		await tasksApi.deleteTask(todoId, taskId);
		try {
		} catch (e) {
			if (axios.isAxiosError(e)) {
				thunkApi.dispatch(appActions.setError({ error: e.message }));
			} else {
				thunkApi.dispatch(appActions.setError({ error: (e as Error).message }));
			}
		}
		return { todoId, taskId };
	},
);

export const changeTaskTC = createAsyncThunk(
	`tasks/change-task`,
	async (
		params: { todoId: string; taskId: string; setting: TaskSettingType },
		{ dispatch, rejectWithValue, getState },
	) => {
		const { todoId, taskId, setting } = params;
		const state = getState();
		//@ts-ignore
		const tasks: TasksType = state.tasks;
		const task = tasks[todoId][tasks[todoId].findIndex(task => task.id === taskId)];
		let model: UpdateModelType = {
			...task,
			...setting,
		};

		dispatch(tasksActions.setStatusTask({ todoId, taskId, status: 'loading' }));
		await tasksApi.updateTask(todoId, taskId, model);
		try {
			dispatch(tasksActions.setStatusTask({ todoId, taskId, status: 'succeeded' }));
			return { todoId, taskId, setting };
		} catch (e) {
			if (axios.isAxiosError(e)) {
				dispatch(appActions.setError({ error: e.message }));
			} else {
				dispatch(appActions.setError({ error: (e as Error).message }));
			}
		} finally {
			dispatch(tasksActions.setStatusTask({ todoId, taskId, status: 'idle' }));
		}
		return { todoId, taskId, setting };
	},
);

const initialState = {} as TasksType;

const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setStatusTask(
			state,
			action: PayloadAction<{
				todoId: string;
				taskId: string;
				status: RequestStatusType;
			}>,
		) {
			const { taskId, todoId, status } = action.payload;
			let task = state[todoId].find(task => task.id === taskId);
			if (task) {
				task!.entityStatus = status;
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(deleteTodoListTC.fulfilled, (state, action) => {
			delete state[action.payload.todoId];
		});
		builder.addCase(addTodoTC.fulfilled, (state, action) => {
			state[action.payload.todolist.id] = [];
		});
		builder.addCase(todolistActions.clearTodos, (state, action) => {
			return {};
		});
		builder.addCase(getTasksTC.fulfilled, (state, action) => {
			state[action.payload.todoId] = action.payload.tasks.map(task => ({ ...task, entityStatus: 'idle' }));
		});
		builder.addCase(addTaskTC.fulfilled, (state, action) => {
			state[action.payload.task.todoListId].unshift({ ...action.payload.task, entityStatus: 'idle' });
		});
		builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
			const { taskId, todoId } = action.payload;
			const taskIndex = state[todoId].findIndex(task => task.id === taskId);
			if (taskIndex !== -1) {
				state[todoId].splice(taskIndex, 1);
			}
		});
		builder.addCase(changeTaskTC.fulfilled, (state, action) => {
			const { taskId, todoId, setting } = action.payload;

			const taskIndex = state[todoId].findIndex(task => task.id === taskId);
			if (taskIndex !== -1) {
				state[todoId][taskIndex] = { ...state[todoId][taskIndex], ...setting };
			}
		});
	},
});

export const tasksActions = slice.actions;
export const tasksSlice = slice.reducer;
