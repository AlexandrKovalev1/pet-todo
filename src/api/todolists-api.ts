import axios from 'axios';

export type TodolistType = {
	id: string;
	title: string;
	addedDate: string;
	order: number;
};

export type ParamsTaskUpdateType = {
	title: string;
	description: string | null;
	order: number;
	status: number;
	priority: number;
	startDate: string | null;
	deadline: string | null;
};

export type ResponseType<D = {}> = {
	resultCode: number;
	messages: String[];
	data: D;
};

export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.1',
	headers: {
		'API-KEY': 'b813de6c-1bc7-47ee-94b8-8283cbcb7526',
	},
});

export const todolistsApi = {
	getTodolists() {
		return instance.get<TodolistType[]>('/todo-lists');
	},
	createTodolist(title: string) {
		return instance.post<
			ResponseType<{
				item: TodolistType;
			}>
		>('/todo-lists', { title });
	},
	updateTodolist(id: string, title: string) {
		return instance.put<ResponseType>(`/todo-lists/${id}`, { title });
	},
	deleteTodolist(id: string) {
		return instance.delete<ResponseType>(`/todo-lists/${id}`);
	},
};
