import { todolistActions, todoListThunks } from 'features/todos/model/_tests_/todolistSlice';
import { appActions, RequestStatusType } from 'app/appSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tasksApi, TaskSettingType, TaskType, UpdateModelType } from 'features/task/api/task-api';
import { handleServerNetworkError, createAppAsyncThunk } from 'common/utils';

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
		builder.addCase(todoListThunks.deleteTodoList.fulfilled, (state, action) => {
			if (action.payload) {
				delete state[action.payload.todoId];
			}
		});
		builder.addCase(todoListThunks.addTodo.fulfilled, (state, action) => {
			if (action.payload) {
				state[action.payload.todolist.id] = [];
			}
		});
		builder.addCase(todolistActions.clearTodos, (state, action) => {
			return {};
		});
		builder.addCase(getTasks.fulfilled, (state, action) => {
			if (action.payload) {
				state[action.payload.todoId] = action.payload.tasks.map(task => ({ ...task, entityStatus: 'idle' }));
			}
		});
		builder.addCase(addTask.fulfilled, (state, action) => {
			if (action.payload) {
				state[action.payload.task.todoListId].unshift({ ...action.payload.task, entityStatus: 'idle' });
			}
		});
		builder.addCase(deleteTask.fulfilled, (state, action) => {
			if (action.payload) {
				const { taskId, todoId } = action.payload;
				const taskIndex = state[todoId].findIndex(task => task.id === taskId);
				if (taskIndex !== -1) {
					state[todoId].splice(taskIndex, 1);
				}
			}
		});
		builder.addCase(changeTask.fulfilled, (state, action) => {
			if (action.payload) {
				const { taskId, todoId, setting } = action.payload;
				const taskIndex = state[todoId].findIndex(task => task.id === taskId);
				if (taskIndex !== -1) {
					state[todoId][taskIndex] = { ...state[todoId][taskIndex], ...setting };
				}
			}
		});
	},
});
//thunks
const getTasks = createAppAsyncThunk<{ todoId: string; tasks: TaskType[] }, string>(
	`${slice.name}/get-tasks`,
	async (todoId: string, { dispatch, rejectWithValue }) => {
		dispatch(appActions.setStatus({ status: 'loading' }));

		try {
			const res = await tasksApi.getTasks(todoId);
			dispatch(appActions.setStatus({ status: 'succeeded' }));
			return { todoId, tasks: res.data.items };
		} catch (e) {
			handleServerNetworkError(e, dispatch);
			return rejectWithValue(null);
		} finally {
			dispatch(appActions.setStatus({ status: 'idle' }));
		}
	},
);
const addTask = createAppAsyncThunk<{ task: TaskType }, { todoId: string; title: string }>(
	`${slice.name}/add-task`,
	async (params: { todoId: string; title: string }, { dispatch, rejectWithValue }) => {
		dispatch(appActions.setStatus({ status: 'loading' }));
		try {
			const res = await tasksApi.createTask(params.todoId, params.title);
			const data = res.data;
			dispatch(appActions.setStatus({ status: 'succeeded' }));
			return { task: data.data.item };
		} catch (e) {
			handleServerNetworkError(e, dispatch);
			return rejectWithValue(null);
		} finally {
			dispatch(appActions.setStatus({ status: 'idle' }));
		}
	},
);
const deleteTask = createAppAsyncThunk<{ todoId: string; taskId: string }, { todoId: string; taskId: string }>(
	`${slice.name}/delete-task`,
	async (params: { todoId: string; taskId: string }, { dispatch, rejectWithValue }) => {
		const { todoId, taskId } = params;
		dispatch(tasksActions.setStatusTask({ todoId, taskId, status: 'loading' }));
		try {
			await tasksApi.deleteTask(todoId, taskId);
			return { todoId, taskId };
		} catch (e) {
			handleServerNetworkError(e, dispatch);
			return rejectWithValue(null);
		}
	},
);

const changeTask = createAppAsyncThunk<
	{ todoId: string; taskId: string; setting: TaskSettingType },
	{
		todoId: string;
		taskId: string;
		setting: TaskSettingType;
	}
>(
	`${slice.name}/change-task`,
	async (
		params: { todoId: string; taskId: string; setting: TaskSettingType },
		{ dispatch, rejectWithValue, getState },
	) => {
		const { todoId, taskId, setting } = params;
		const state = getState();
		const tasks: TasksType = state.tasks;
		const task = tasks[todoId][tasks[todoId].findIndex(task => task.id === taskId)];
		let model: UpdateModelType = {
			...task,
			...setting,
		};

		dispatch(tasksActions.setStatusTask({ todoId, taskId, status: 'loading' }));

		try {
			await tasksApi.updateTask(todoId, taskId, model);
			dispatch(tasksActions.setStatusTask({ todoId, taskId, status: 'succeeded' }));
			return { todoId, taskId, setting };
		} catch (e) {
			handleServerNetworkError(e, dispatch);
			return rejectWithValue(null);
		} finally {
			dispatch(tasksActions.setStatusTask({ todoId, taskId, status: 'idle' }));
		}
	},
);
//types
export type TasksType = {
	[key: string]: TaskDomainType[];
};
export type TaskDomainType = TaskType & {
	entityStatus: RequestStatusType;
};
//exports
export const tasksActions = slice.actions;
export const tasksSlice = slice.reducer;
export const tasksThunks = { getTasks, addTask, deleteTask, changeTask };
