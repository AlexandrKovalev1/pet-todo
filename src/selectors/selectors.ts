import { RootStateType } from '../redux/store/store';
import { TodolistDomainType } from '../redux/reducers/todolistReducer';

export const todolistSelector = (state: RootStateType): TodolistDomainType[] =>
	state.todoLists;
