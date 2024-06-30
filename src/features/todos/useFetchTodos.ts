import { useAppDispatch, useAppSelector } from 'app/store';
import { useEffect } from 'react';
import { getTodosTC, selectTodoLists } from 'bll/todolistSlice';
import { selectIsAuth } from 'bll/authSlice';

export const useFetchTodos = () => {
	let todolists = useAppSelector(selectTodoLists);
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);

	useEffect(() => {
		if (!isAuth) {
			return;
		}
		dispatch(getTodosTC());
	}, [dispatch, isAuth]);

	return {
		todolists,
	};
};
