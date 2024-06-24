import { instance, ResponseType } from './instance';

export const authApi = {
	getIsAuth: () => {
		return instance.get<ResponseType<{
			id: number,
			email: string,
			login: string
		}>>('auth/me');
	},
	login:(data:LoginParamsType)=>{
		return instance.post<ResponseType<{
			userId?: number,
			token?:number
		}>>('auth/login',data)
	},
	logout:()=>{
		return instance.delete<ResponseType>('auth/login')
	}

};


export type LoginParamsType = {
	email:string,
	password:string
	rememberMe:boolean
	captcha?:string
}