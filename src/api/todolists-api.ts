import axios from 'axios';

//axios instance
export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.1',
	headers: {
		'API-KEY': 'b813de6c-1bc7-47ee-94b8-8283cbcb7526',
		// Authorization: `Bearer 4eccd015-697e-433c-9790-635d9b3d4378`,
	},
});

//todoListApi CRUD object
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

//types

export type TodolistType = {
	id: string;
	title: string;
	addedDate: string;
	order: number;
};

export type ResponseType<D = {}> = {
	resultCode: number;
	messages: string[];
	data: D;
};
