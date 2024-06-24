import { RootStateType } from '../app/store';
import { TodolistDomainType } from '../bll/todolistReducer';

export const selectTodolists = (state: RootStateType) => state.todoLists;
export const selectAppStatus = (state: RootStateType) => state.app.status;
export const selectIsAuth = (state: RootStateType) => state.app.isAuth;
export const selectLogin = (state: RootStateType) => state.app.login;

