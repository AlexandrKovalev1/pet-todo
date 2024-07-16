import { useAppDispatch, useAppSelector } from 'app/store';
import { useEffect } from 'react';
import { selectTodoLists, todoListThunks } from 'features/todos/model/_tests_/todolistSlice';
import { selectIsAuth } from 'features/login/model/authSlice';

export const useFetchTodos = () => {
	let todolists = useAppSelector(selectTodoLists);
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);

	useEffect(() => {
		if (!isAuth) {
			return;
		}
		dispatch(todoListThunks.getTodos());
	}, [dispatch, isAuth]);

	return {
		todolists,
	};
};
