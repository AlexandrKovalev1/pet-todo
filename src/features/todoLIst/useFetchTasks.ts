import { useAppDispatch, useAppSelector } from '../../app/store';
import { getTasksTC, TaskDomainType } from '../../bll/tasksReducer';
import { useEffect } from 'react';

export const useFetchTasks = (todoId: string) => {
	const tasks = useAppSelector<TaskDomainType[]>(state => state.tasks[todoId]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getTasksTC(todoId));
	}, [dispatch, todoId]);

	return {
		tasks
	};
};