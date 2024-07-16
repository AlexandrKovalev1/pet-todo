import { instance } from 'common/api/instance';
import { BaseResponse } from 'common/types/BaseResponse';
import { LoginParamsType } from 'features/login/api/authApi.types';

export const authApi = {
	getIsAuth: () => {
		return instance.get<BaseResponse<UserDataType>>('auth/me');
	},
	me: (data: LoginParamsType) => {
		return instance.post<
			BaseResponse<{
				userId?: number;
				token?: number;
			}>
		>('auth/login', data);
	},
	logout: () => {
		return instance.delete<BaseResponse>('auth/login');
	},
};

export type UserDataType = {
	id: number;
	email: string;
	login: string;
};
