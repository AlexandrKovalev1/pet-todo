import { CreateTodolist } from '../../components/createTodoLIst/CreateTodolist';
import { TodoList } from '../todoLIst/TodoList';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { todolistSelector } from '../../selectors/selectors';
import { getTodosTC } from '../../bll/todolistReducer';

export const Todos = () => {
	let todolists = useAppSelector(todolistSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getTodosTC());
	}, [dispatch]);
	return (
		<GridWrapper>
			<CreateTodolist />
			{todolists.map(todo => (
				<TodoList
					key={todo.id}
					filter={todo.filter}
					todoId={todo.id}
					title={todo.title}
				/>
			))}
		</GridWrapper>
	);
};

const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, min-content));
	grid-auto-rows: auto;
	grid-gap: 20px;
`;
