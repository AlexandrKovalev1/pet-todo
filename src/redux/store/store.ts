import {
	applyMiddleware,
	combineReducers,
	legacy_createStore,
	UnknownAction,
} from 'redux';
import { todolistReducer } from '../reducers/todolistReducer';
import { tasksReducer } from '../reducers/tasksReducer';
import { thunk, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducers = combineReducers({
	todoLists: todolistReducer,
	tasks: tasksReducer,
});

export const store = legacy_createStore(
	rootReducers,
	undefined,
	applyMiddleware(thunk),
);

type AppDispatchType = ThunkDispatch<RootStateType, unknown, UnknownAction>;
export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export type RootStateType = ReturnType<typeof rootReducers>;
export type DispatchType = ReturnType<typeof useDispatch>;
