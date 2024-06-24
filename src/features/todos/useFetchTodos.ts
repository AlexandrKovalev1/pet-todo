import { useAppDispatch, useAppSelector } from '../../app/store';
import { selectTodolists} from '../../selectors/selectors';
import { useEffect } from 'react';
import { getTodosTC } from '../../bll/todolistReducer';

export const useFetchTodos = ()=> {
	let todolists = useAppSelector(selectTodolists);
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(state => state.app.isAuth);

	useEffect(() => {
		if (!isAuth) {
			return;
		}
			dispatch(getTodosTC());
	}, [dispatch, isAuth]);

	return {
		todolists
	}

};

