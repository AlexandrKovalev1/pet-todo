import {
	Action,
	applyMiddleware,
	combineReducers,
	legacy_createStore
} from 'redux';

import { todolistReducer, TodolistsActionType } from '../bll/todolistReducer';
import { TasksActionType, tasksReducer } from '../bll/tasksReducer';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appReducer, AppReducerActionType } from '../bll/appReducer';
import { configureStore } from '@reduxjs/toolkit';

const rootReducers = combineReducers({
	todoLists: todolistReducer,
	tasks: tasksReducer,
	app: appReducer
});

export const store = configureStore({
		reducer: rootReducers,
	}
);


type AppDispatchType = ThunkDispatch<RootStateType, unknown, Action>;
export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export type RootStateType = ReturnType<typeof rootReducers>;
export type AppActionsType =
	| TodolistsActionType
	| TasksActionType
	| AppReducerActionType;

export type AppThunkType<ReturnType = void> = ThunkAction<
	ReturnType,
	RootStateType,
	unknown,
	AppActionsType
>;
