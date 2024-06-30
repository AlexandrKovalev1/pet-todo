import { RootStateType } from '../app/store';

export const selectTodolists = (state: RootStateType) => state.todoLists;
export const selectAppStatus = (state: RootStateType) => state.app.status;
export const selectIsAuth = (state: RootStateType) => state.auth.isAuth;
export const selectLogin = (state: RootStateType) => state.app.login;
