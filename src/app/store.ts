import {
	Action,
	applyMiddleware,
	combineReducers,
	legacy_createStore
} from 'redux';

import { todolistReducer, TodolistsActionType } from '../bll/todolistReducer';
import { TasksActionType, tasksReducer } from '../bll/tasksReducer';
import thunk, {  ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appReducer, AppReducerActionType } from '../bll/appReducer';

const rootReducers = combineReducers({
	todoLists: todolistReducer,
	tasks: tasksReducer,
	app: appReducer,
});

export const store = legacy_createStore(
	rootReducers,
	undefined,
	applyMiddleware(thunk),
);

type AppDispatchType = ThunkDispatch<RootStateType, unknown,Action >;
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
