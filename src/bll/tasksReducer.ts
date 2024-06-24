import {
	AddTodolistType,
	DeleteTodoType,
	SetTodoListsType
} from './todolistReducer';
import {
	tasksApi,
	TaskSettingType,
	TaskType,
	UpdateModelType
} from '../api/task-api';
import { RequestStatusType, setErrorAC, setStatusAC } from './appReducer';
import { Dispatch } from 'redux';
import { RootStateType } from '../app/store';
import axios from 'axios';

let initialState: TasksType = {};
export const tasksReducer = (
	state: TasksType = initialState,
	action: TasksActionType
): TasksType => {
	switch (action.type) {
		case 'ADD-TODOLIST': {
			return { ...state, [action.todoList.id]: [] };
		}
		case 'DELETE-TODO': {
			let newState = { ...state };
			delete newState[action.todoId];
			return newState;
		}
		case 'ADD-TASK': {
			return {
				...state,
				[action.task.todoListId]: [
					{ ...action.task, entityStatus: 'idle' },
					...state[action.task.todoListId]
				]
			};
		}
		case 'CHANGE-TASK': {
			let { taskId, todoId, setting } = action;
			return {
				...state,
				[todoId]: state[todoId].map(task =>
					task.id === taskId ? { ...task, ...setting } : task
				)
			};
		}
		case 'DELETE-TASK': {
			let { taskId, todoId } = action;
			return {
				...state,
				[todoId]: state[todoId].filter(task => task.id !== taskId)
			};
		}
		case 'SET-TODOLISTS': {
			let copyState = { ...state };

			action.todolists.forEach(tl => {
				copyState[tl.id] = [];
			});

			return copyState;
		}
		case 'SET-TASKS': {
			return {
				...state,
				[action.todoId]: action.tasks.map(task => ({
					...task,
					entityStatus: 'idle'
				}))
			};
		}
		case 'TASK/SET_STATUS': {
			return {
				...state,
				[action.todoId]: state[action.todoId].map(task =>
					task.id === action.taskId
						? {
							...task,
							entityStatus: action.status
						}
						: task
				)
			};
		}
		default:
			return state;
	}
};

//Action Creators
export const addTaskAC = (task: TaskType) => {
	return {
		type: 'ADD-TASK',
		task
	} as const;
};

export const changeTaskAC = (
	todoId: string,
	taskId: string,
	setting: TaskSettingType
) => {
	return {
		type: 'CHANGE-TASK',
		todoId,
		taskId,
		setting
	} as const;
};

export const deleteTaskAC = (todoId: string, taskId: string) => {
	return {
		type: 'DELETE-TASK',
		todoId,
		taskId
	} as const;
};

export const setTasksAc = (todoId: string, tasks: TaskType[]) => {
	return {
		type: 'SET-TASKS',
		todoId,
		tasks
	} as const;
};
export const setStatusTaskAC = (
	todoId: string,
	taskId: string,
	status: RequestStatusType
) => ({ type: 'TASK/SET_STATUS', status, todoId, taskId }) as const;

//Thunk Creators
export const getTasksTC = (todoId: string) => async (dispatch: Dispatch) => {
	dispatch(setStatusAC('loading'));
	try {
		const res = await tasksApi.getTasks(todoId);
		dispatch(setTasksAc(todoId, res.data.items));
		dispatch(setStatusAC('succeeded'));
	} catch (e) {
		if (axios.isAxiosError(e)) {
			dispatch(setErrorAC(e.message));
		} else {
			dispatch(setErrorAC((e as Error).message));
		}
	} finally {
		dispatch(setStatusAC('idle'));
	}

};

export const deleteTaskTC =
	(todoId: string, taskId: string) => async (dispatch: Dispatch) => {
		dispatch(setStatusAC('loading'));
		try {
		await tasksApi.deleteTask(todoId, taskId);
			dispatch(deleteTaskAC(todoId, taskId));
			dispatch(setStatusAC('succeeded'));
		} catch (e) {
			if (axios.isAxiosError(e)) {
				dispatch(setErrorAC(e.message));
			} else {
				dispatch(setErrorAC((e as Error).message));
			}
		} finally {
			dispatch(setStatusAC('idle'));
		}
	};

export const addTaskTC =
	(todoId: string, title: string) => (dispatch: Dispatch) => {
		dispatch(setStatusAC('loading'));
		tasksApi
			.createTask(todoId, title)
			.then(res => res.data)
			.then(data => {
				dispatch(addTaskAC(data.data.item));
				dispatch(setStatusAC('succeeded'));
			})
			.finally(() => dispatch(setStatusAC('idle')));


	};

export const changeTaskTC =
	(todoId: string, taskId: string, setting: TaskSettingType) =>
		async (dispatch: Dispatch, getState: () => RootStateType) => {
			const tasks: TasksType = getState().tasks;
			const task = tasks[todoId].find(task => task.id === taskId);

			if (!task) return;

			let model: UpdateModelType = {
				...task,
				...setting
			};

			dispatch(setStatusAC('loading'));
			try {
				await tasksApi.updateTask(todoId, taskId, model);
				dispatch(changeTaskAC(todoId, taskId, setting));
				dispatch(setStatusAC('succeeded'));
			} catch (e) {
				if (axios.isAxiosError(e)) {
					dispatch(setErrorAC(e.message));
				} else {
					dispatch(setErrorAC((e as Error).message));
				}
			} finally {
				dispatch(setStatusAC('idle'));
			}
		};

//types
export type TaskDomainType = TaskType & {
	entityStatus: RequestStatusType;
};
export type TasksType = {
	[key: string]: TaskDomainType[];
};

export type TasksActionType =
	| AddTaskType
	| DeleteTaskType
	| DeleteTodoType
	| AddTodolistType
	| ChangeTaskStatusType
	| SetTodoListsType
	| SetTasksType
	| SetStatusTaskType;

type AddTaskType = ReturnType<typeof addTaskAC>;
type DeleteTaskType = ReturnType<typeof deleteTaskAC>;
export type SetTasksType = ReturnType<typeof setTasksAc>;
type ChangeTaskStatusType = ReturnType<typeof changeTaskAC>;
type SetStatusTaskType = ReturnType<typeof setStatusTaskAC>;
