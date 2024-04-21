import { AddTodolistType, DeleteTodoType } from './todolistReducer';
import { v4 } from 'uuid';

export type TaskType = {
	id: string;
	title: string;
	isDone: boolean;
};

export type TasksType = {
	[key: string]: TaskType[];
};

type ActionType =
	| AddTaskType
	| DeleteTaskType
	| DeleteTodoType
	| AddTodolistType
	| ChangeTaskStatusType;

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
				isDone: false,
			};
			return {
				...state,
				[action.todoId]: [newTask, ...state[action.todoId]],
			};
		}
		case 'CHANGE-TASK_STATUS': {
			let { taskId, todoId, isDone } = action;
			return {
				...state,
				[todoId]: state[todoId].map(task =>
					task.id === taskId ? { ...task, isDone } : task,
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
	isDone: boolean,
) => {
	return {
		type: 'CHANGE-TASK_STATUS',
		todoId,
		taskId,
		isDone,
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
