import { instance, ParamsTaskUpdateType, ResponseType } from './todolists-api';

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3,
}

export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4,
}

export type TaskType = {
	id: string;
	title: string;
	description: null | string;
	todoListId: string;
	order: number;
	status: TaskStatuses;
	priority: TaskPriorities;
	startDate: null | string;
	deadline: null | string;
	addedDate: string;
};

type GetTasksResponseType = {
	items: TaskType[];
	totalCount: number;
	error: null | string;
};

export const tasksApi = {
	getTasks(id: string) {
		return instance.get<GetTasksResponseType>(`/todo-lists/${id}/tasks`);
	},
	createTask(id: string, title: string) {
		return instance.post<ResponseType<{ item: TaskType }>>(
			`/todo-lists/${id}/tasks`,
			{ title },
		);
	},
	updateTask(todoId: string, taskId: string, title: string) {
		let params: ParamsTaskUpdateType = {
			title,
			description: null,
			status: 0,
			priority: 1,
			startDate: null,
			deadline: null,
			order: -1,
		};
		return instance.put<ResponseType<{ item: TaskType }>>(
			`/todo-lists/${todoId}/tasks/${taskId}`,
			params,
		);
	},
	deleteTask(todoId: string, taskId: string) {
		return instance.delete<ResponseType>(
			`/todo-lists/${todoId}/tasks/${taskId}`,
		);
	},
};
