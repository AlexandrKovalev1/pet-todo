import React from 'react';
import styled from 'styled-components';
import { useFetchTodos } from 'features/todos/lib/useFetchTodos';
import { TodoList } from 'features/todos/ui/todoLIst/TodoList';
import { CreateTodolist } from 'common/components/createTodoLIst/CreateTodolist';

export const Todos = () => {
	const { todolists } = useFetchTodos();

	return (
		<GridWrapper>
			<CreateTodolist />
			{todolists.map(todo => (
				<TodoList key={todo.id} filter={todo.filter} todoId={todo.id} title={todo.title} />
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
