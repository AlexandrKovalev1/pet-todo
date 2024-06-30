import React from 'react';
import { Provider } from 'react-redux';
import { RootStateType, store } from '../src/app/store';
import { combineReducers, legacy_createStore } from 'redux';
import { tasksSlice, TasksType } from 'bll/tasksSlice';
import { todolistSlice, TodolistDomainType } from 'bll/todolistSlice';
import { v1 } from 'uuid';
import { TaskPriorities, TaskStatuses } from '../src/api/task-api';
import { appSlice } from 'bll/appSlice';

const rootReducer = combineReducers({
	todoLists: todolistSlice,
	tasks: tasksSlice,
	app: appSlice,
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
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as RootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
	return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
