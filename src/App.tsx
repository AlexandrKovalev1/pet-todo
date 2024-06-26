import React from 'react';
import './App.css';
import { Header } from './layout/header/Header';
import { Main } from './layout/main/Main';
import { Container } from './components/container/Container';
import { CreateTodolist } from './components/createTodoLIst/CreateTodolist';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { todolistSelector } from './selectors/selectors';
import { TodoList } from './components/todoLIst/TodoList';

function App() {
	let todolists = useSelector(todolistSelector);
	return (
		<div className='App'>
			<Header />
			<Main>
				<Container width={'1440px'}>
					<GridWrapper>
						<CreateTodolist />
						{todolists.map(todo => (
							<TodoList
								filter={todo.filter}
								todoId={todo.id}
								title={todo.title}
							/>
						))}
					</GridWrapper>
				</Container>
			</Main>
		</div>
	);
}

export default App;

const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, min-content));
	grid-auto-rows: auto;
	grid-gap: 20px;
`;
