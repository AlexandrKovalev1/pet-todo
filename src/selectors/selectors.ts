import { RootStateType } from '../app/store';
import { TodolistDomainType } from '../bll/todolistReducer';

export const todolistSelector = (state: RootStateType): TodolistDomainType[] =>
	state.todoLists;
