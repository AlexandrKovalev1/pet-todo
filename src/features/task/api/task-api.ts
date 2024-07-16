import { BaseResponse } from 'common/types/BaseResponse';
import { instance } from 'common/api/instance';
import { TaskPriorities, TaskStatuses } from 'common/enums/enums';

export const tasksApi = {
	getTasks(id: string) {
		return instance.get<GetTasksResponseType>(`todo-lists/${id}/tasks`);
	},
	createTask(id: string, title: string) {
		return instance.post<BaseResponse<{ item: TaskType }>>(`todo-lists/${id}/tasks`, { title });
	},
	updateTask(todoId: string, taskId: string, model: UpdateModelType) {
		return instance.put<BaseResponse<{ item: TaskType }>>(`todo-lists/${todoId}/tasks/${taskId}`, model);
	},
	deleteTask(todoId: string, taskId: string) {
		return instance.delete<BaseResponse>(`todo-lists/${todoId}/tasks/${taskId}`);
	},
};

//types

export type TaskSettingType = {
	title?: string;
	description?: null | string;
	status?: TaskStatuses;
	priority?: number;
	startDate?: null | string;
	deadline?: null | string;
	order?: number;
};

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

export type UpdateModelType = Omit<TaskType, 'id' | 'todoListId' | 'addedDate'>;

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
