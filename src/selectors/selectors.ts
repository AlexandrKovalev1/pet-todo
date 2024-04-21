import { RootStateType } from '../redux/store/store';
import { TodolistType } from '../redux/reducers/todolistReducer';
import { TasksType } from '../redux/reducers/tasksReducer';

export const todolistSelector = (state: RootStateType): TodolistType[] =>
	state.todoLists;
