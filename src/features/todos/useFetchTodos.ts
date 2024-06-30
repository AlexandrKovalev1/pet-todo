import { useAppDispatch, useAppSelector } from '../../app/store';
import { selectIsAuth, selectTodolists } from '../../selectors/selectors';
import { useEffect } from 'react';
import { getTodosTC } from 'bll/todolistSlice';

export const useFetchTodos = () => {
	let todolists = useAppSelector(selectTodolists);
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
