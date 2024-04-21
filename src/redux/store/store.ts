import { combineReducers, legacy_createStore } from 'redux';
import { todolistReducer } from '../reducers/todolistReducer';
import { tasksReducer } from '../reducers/tasksReducer';

const rootReducers = combineReducers({
	todoLists: todolistReducer,
	tasks: tasksReducer,
});

export let store = legacy_createStore(rootReducers);

export type RootStateType = ReturnType<typeof rootReducers>;
