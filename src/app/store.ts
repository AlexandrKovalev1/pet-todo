import { todolistSlice } from 'features/todos/model/_tests_/todolistSlice';
import { tasksSlice } from 'features/task/model/tasksSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appSlice } from 'app/appSlice';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from 'features/login/model/authSlice';

export const store = configureStore({
	reducer: {
		todoLists: todolistSlice,
		tasks: tasksSlice,
		app: appSlice,
		auth: authSlice,
	},
});

export const useAppDispatch = useDispatch<typeof store.dispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
