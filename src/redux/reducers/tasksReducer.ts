import axios from 'axios';

import {
	AddTodolistType,
	DeleteTodoType,
	SetTodoListsType,
} from './todolistReducer';
import { v4 } from 'uuid';
import {
	TaskPriorities,
	tasksApi,
	TaskStatuses,
	TaskType,
} from '../../api/task-api';
import { DispatchType } from '../store/store';

export type TasksType = {
	[key: string]: TaskType[];
};

type ActionType =
	| AddTaskType
	| DeleteTaskType
	| DeleteTodoType
	| AddTodolistType
	| ChangeTaskStatusType
	| EditTaskTitleType
	| SetTodoListsType
	| SetTasksType;

let initialState: TasksType = {};
export const tasksReducer = (
	state: TasksType = initialState,
	action: ActionType,
): TasksType => {
	switch (action.type) {
		case 'ADD-TODOLIST': {
			return { ...state, [action.todoid]: [] };
		}
		case 'DELETE-TODO': {
			let newState = { ...state };
			delete newState[action.todoId];
			return newState;
		}
		case 'ADD-TASK': {
			let newTask: TaskType = {
				id: v4(),
				title: action.title,
				status: TaskStatuses.New,
				description: '',
				todoListId: action.todoId,
				order: 0,
				priority: TaskPriorities.Hi,
				addedDate: '',
				startDate: '',
				deadline: '',
			};
			return {
				...state,
				[action.todoId]: [newTask, ...state[action.todoId]],
			};
		}
		case 'CHANGE-TASK_STATUS': {
			let { taskId, todoId, status } = action;
			return {
				...state,
				[todoId]: state[todoId].map(task =>
					task.id === taskId ? { ...task, status } : task,
				),
			};
		}
		case 'DELETE-TASK': {
			let { taskId, todoId } = action;
			return {
				...state,
				[todoId]: state[todoId].filter(task => task.id !== taskId),
			};
		}
		case 'EDIT-TASK-TITLE': {
			let { taskId, todoId, title } = action;
			return {
				...state,
				[todoId]: state[todoId].map(task =>
					task.id === taskId ? { ...task, title } : task,
				),
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
			let copyState = { ...state };

			copyState[action.todoId] = action.tasks;

			return copyState;
		}

		default:
			return state;
	}
};

type AddTaskType = ReturnType<typeof addTaskAC>;
export const addTaskAC = (todoId: string, title: string) => {
	return {
		type: 'ADD-TASK',
		title,
		todoId,
	} as const;
};

type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;

export const changeTaskStatusAC = (
	todoId: string,
	taskId: string,
	status: number,
) => {
	return {
		type: 'CHANGE-TASK_STATUS',
		todoId,
		taskId,
		status,
	} as const;
};

type DeleteTaskType = ReturnType<typeof deleteTaskAC>;
export const deleteTaskAC = (todoId: string, taskId: string) => {
	return {
		type: 'DELETE-TASK',
		todoId,
		taskId,
	} as const;
};

type EditTaskTitleType = ReturnType<typeof editTaskTitleAC>;
export const editTaskTitleAC = (
	todoId: string,
	taskId: string,
	title: string,
) => {
	return {
		type: 'EDIT-TASK-TITLE',
		todoId,
		taskId,
		title,
	} as const;
};

export type SetTasksType = ReturnType<typeof setTasksAc>;

export const setTasksAc = (todoId: string, tasks: TaskType[]) => {
	return {
		type: 'SET-TASKS',
		todoId,
		tasks,
	} as const;
};

export const getTasks = (todoId: string) => (dispatch: DispatchType) => {
	tasksApi
		.getTasks(todoId)
		.then(res => dispatch(setTasksAc(todoId, res.data.items)));
};
