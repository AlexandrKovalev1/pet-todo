import React from 'react';
import { Provider } from 'react-redux';
import { RootState } from '../src/app/store';
import { combineReducers, legacy_createStore } from 'redux';
import { tasksSlice } from 'features/task/model/tasksSlice';
import { todolistSlice } from 'features/todos/model/_tests_/todolistSlice';
import { v1, v4 } from 'uuid';
import { TaskPriorities, TaskStatuses } from 'features/task/api/task-api';
import { appSlice } from 'app/appSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	todoLists: todolistSlice,
	tasks: tasksSlice,
	app: appSlice,
});

let initialGlobalState: RootState = {
	todoLists: [
		{ id: v4(), title: 'First Todo', addedDate: '', order: 0, filter: 'All', entityStatus: 'idle' },
		{ id: v4(), title: 'Second Todo', addedDate: '', order: 0, filter: 'All', entityStatus: 'idle' },
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
				entityStatus: 'idle',
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
				entityStatus: 'idle',
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
				entityStatus: 'idle',
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
				entityStatus: 'idle',
			},
		],
	},
	app: {
		status: 'idle',
		error: null,
		id: null,
		login: null,
		email: null,
		initialized: false,
	},
	auth: {
		isAuth: false,
	},
};

//@ts-ignore
// export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as RootStateType);

export const storyBookStore = configureStore({
	reducer: rootReducer,
});

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
	return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
