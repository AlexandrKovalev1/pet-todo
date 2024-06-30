import { Action, AnyAction, combineReducers } from 'redux';
import { todolistSlice } from 'bll/todolistSlice';
import { tasksSlice } from 'bll/tasksSlice';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appSlice } from 'bll/appSlice';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from 'bll/authSlice';

const rootReducers = combineReducers({
	todoLists: todolistSlice,
	tasks: tasksSlice,
	app: appSlice,
	auth: authSlice,
});

export const store = configureStore({
	reducer: rootReducers,
});

type AppDispatchType = ThunkDispatch<RootStateType, unknown, Action>;

export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export type RootStateType = ReturnType<typeof store.getState>;

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AnyAction>;
