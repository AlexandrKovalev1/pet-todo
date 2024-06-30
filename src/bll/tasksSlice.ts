import axios from 'axios';
import { Dispatch } from 'redux';
import { RootStateType } from 'app/store';
import { todolistActions } from 'bll/todolistSlice';
import { appActions, RequestStatusType } from 'bll/appSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tasksApi, TaskSettingType, TaskType, UpdateModelType } from 'api/task-api';

export type TasksType = {
	[key: string]: TaskDomainType[];
};
export type TaskDomainType = TaskType & {
	entityStatus: RequestStatusType;
};

const initialState = {} as TasksType;

const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask(state, action: PayloadAction<{ task: TaskType }>) {
			state[action.payload.task.todoListId].unshift({ ...action.payload.task, entityStatus: 'idle' });
			// return state;
		},
		changeTask(
			state,
			action: PayloadAction<{
				todoId: string;
				taskId: string;
				setting: TaskSettingType;
			}>,
		) {
			const { taskId, todoId, setting } = action.payload;
			const taskIndex = state[todoId].findIndex(task => task.id === taskId);
			if (taskIndex !== -1) {
				state[todoId][taskIndex] = { ...state[todoId][taskIndex], ...setting };
			}
		},
		deleteTask(state, action: PayloadAction<{ todoId: string; taskId: string }>) {
			const { taskId, todoId } = action.payload;
			const taskIndex = state[todoId].findIndex(task => task.id === taskId);
			if (taskIndex !== -1) {
				state[todoId].splice(taskIndex, 1);
			}
		},
		setTasks(state, action: PayloadAction<{ todoId: string; tasks: TaskType[] }>) {
			const { todoId, tasks } = action.payload;
			state[todoId] = tasks.map(task => ({ ...task, entityStatus: 'idle' }));
		},
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
		builder.addCase(todolistActions.deleteTodo, (state, action) => {
			delete state[action.payload.todoId];
		});
		builder.addCase(todolistActions.addTodo, (state, action) => {
			state[action.payload.todolist.id] = [];
		});
	},
});

//Thunk Creators
export const getTasksTC = (todoId: string) => async (dispatch: Dispatch) => {
	dispatch(appActions.setStatus({ status: 'loading' }));
	try {
		const res = await tasksApi.getTasks(todoId);
		dispatch(tasksActions.setTasks({ todoId, tasks: res.data.items }));
		dispatch(appActions.setStatus({ status: 'succeeded' }));
	} catch (e) {
		if (axios.isAxiosError(e)) {
			dispatch(appActions.setError({ error: e.message }));
		} else {
			dispatch(appActions.setError({ error: (e as Error).message }));
		}
	} finally {
		dispatch(appActions.setStatus({ status: 'idle' }));
	}
};

export const addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
	dispatch(appActions.setStatus({ status: 'loading' }));
	tasksApi
		.createTask(todoId, title)
		.then(res => res.data)
		.then(data => {
			dispatch(tasksActions.addTask({ task: data.data.item }));
			dispatch(appActions.setStatus({ status: 'succeeded' }));
		})
		.finally(() => dispatch(appActions.setStatus({ status: 'idle' })));
};

export const deleteTaskTC = (todoId: string, taskId: string) => async (dispatch: Dispatch) => {
	dispatch(tasksActions.setStatusTask({ todoId, taskId, status: 'loading' }));
	try {
		await tasksApi.deleteTask(todoId, taskId);
		dispatch(tasksActions.deleteTask({ todoId, taskId }));
	} catch (e) {
		if (axios.isAxiosError(e)) {
			dispatch(appActions.setError({ error: e.message }));
		} else {
			dispatch(appActions.setError({ error: (e as Error).message }));
		}
	}
};

export const changeTaskTC =
	(todoId: string, taskId: string, setting: TaskSettingType) =>
	async (dispatch: Dispatch, getState: () => RootStateType) => {
		const tasks: TasksType = getState().tasks;
		const task = tasks[todoId].find(task => task.id === taskId);

		if (!task) return;

		let model: UpdateModelType = {
			...task,
			...setting,
		};

		dispatch(tasksActions.setStatusTask({ todoId, taskId, status: 'loading' }));
		try {
			await tasksApi.updateTask(todoId, taskId, model);
			dispatch(tasksActions.changeTask({ todoId, taskId, setting }));

			dispatch(tasksActions.setStatusTask({ todoId, taskId, status: 'succeeded' }));
		} catch (e) {
			if (axios.isAxiosError(e)) {
				dispatch(appActions.setError({ error: e.message }));
			} else {
				dispatch(appActions.setError({ error: (e as Error).message }));
			}
		} finally {
			dispatch(tasksActions.setStatusTask({ todoId, taskId, status: 'idle' }));
		}
	};

export const tasksActions = slice.actions;
export const tasksSlice = slice.reducer;
