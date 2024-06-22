import { instance, ResponseType } from './todolists-api';

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
	updateTask(todoId: string, taskId: string, model: UpdateModelType) {
		return instance.put<ResponseType<{ item: TaskType }>>(
			`/todo-lists/${todoId}/tasks/${taskId}`,
			model,
		);
	},
	deleteTask(todoId: string, taskId: string) {
		return instance.delete<ResponseType>(
			`/todo-lists/${todoId}/tasks/${taskId}`,
		);
	},
};

//types

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3,
}

export type TaskSettingType = {
	title?: string;
	description?: null | string;
	status?: TaskStatuses;
	priority?: number;
	startDate?: null | string;
	deadline?: null | string;
	order?: number;
};

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

export enum ResultCode {
	SUCCESS = 0,
	ERROR = 1,
	RECAPTCHA_ERROR = 10,
}

type GetTasksResponseType = {
	items: TaskType[];
	totalCount: number;
	error: null | string;
};

export type UpdateModelType = {
	title: string;
	description: null | string;
	status: TaskStatuses;
	priority: number;
	startDate: null | string;
	deadline: null | string;
	order: number;
};
