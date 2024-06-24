import axios from 'axios';

export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	headers: {
		'API-KEY': 'b813de6c-1bc7-47ee-94b8-8283cbcb7526',
		// Authorization: `Bearer 4eccd015-697e-433c-9790-635d9b3d4378`,
	},
});

export type ResponseType<D = {}> = {
	resultCode: number;
	messages: string[];
	data: D;
};