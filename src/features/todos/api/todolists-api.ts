import { BaseResponse } from 'common/types/BaseResponse';
//todoListApi CRUD object
import { instance } from 'common/api/instance';

export const todolistsApi = {
	getTodolists() {
		return instance.get<TodolistType[]>('todo-lists');
	},
	createTodolist(title: string) {
		return instance.post<
			BaseResponse<{
				item: TodolistType;
			}>
		>('todo-lists', { title });
	},
	updateTodolist(id: string, title: string) {
		return instance.put<BaseResponse>(`todo-lists/${id}`, { title });
	},
	deleteTodolist(id: string) {
		return instance.delete<BaseResponse>(`todo-lists/${id}`);
	},
};

//types

export type TodolistType = {
	id: string;
	title: string;
	addedDate: string;
	order: number;
};
