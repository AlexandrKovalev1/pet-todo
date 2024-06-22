import React from 'react';
import { Provider } from 'react-redux';
import { RootStateType, store } from '../src/app/store';
import { combineReducers, legacy_createStore } from 'redux';
import { tasksReducer, TasksType } from '../src/bll/tasksReducer';
import {
	todolistReducer,
	TodolistDomainType,
} from '../src/bll/todolistReducer';
import { v1 } from 'uuid';
import { TaskPriorities, TaskStatuses } from '../src/api/task-api';
import { appReducer } from '../src/bll/appReducer';

const rootReducer = combineReducers({
	todoLists: todolistReducer,
	tasks: tasksReducer,
	app: appReducer,
});

let initialGlobalState: RootStateType = {
	todoLists: [
		{
			id: 'todolistId1',
			title: 'What to learn',
			filter: 'All',
			addedDate: '',
			order: 0,
		},
		{
			id: 'todolistId2',
			title: 'What to buy',
			filter: 'All',
			addedDate: '',
			order: 0,
		},
	],
	tasks: {
		['todolistId1']: [
			{
				id: v1(),
				title: 'HTML&CSS',
				status: TaskStatuses.New,
				description: '',
				todoListId: 'todolistId1',
				order: 0,
				priority: TaskPriorities.Hi,
				addedDate: '',
				startDate: '',
				deadline: '',
			},
			{
				id: v1(),
				title: 'JS',
				status: TaskStatuses.New,
				description: '',
				todoListId: 'todolistId1',
				order: 0,
				priority: TaskPriorities.Hi,
				addedDate: '',
				startDate: '',
				deadline: '',
			},
		],
		['todolistId2']: [
			{
				id: v1(),
				title: 'Milk',
				status: TaskStatuses.Completed,
				description: '',
				todoListId: 'todolistId2',
				order: 0,
				priority: TaskPriorities.Hi,
				addedDate: '',
				startDate: '',
				deadline: '',
			},
			{
				id: v1(),
				title: 'React Book',
				status: TaskStatuses.New,
				description: '',
				todoListId: 'todolistId1',
				order: 0,
				priority: TaskPriorities.Hi,
				addedDate: '',
				startDate: '',
				deadline: '',
			},
		],
	},
	app: {
		status: 'idle',
		error: null,
	},
};

//@ts-ignore
export const storyBookStore = legacy_createStore(
	rootReducer,
	initialGlobalState as RootStateType,
);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
	return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
