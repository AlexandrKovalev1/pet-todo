import './App.css';
import React from 'react';
import { Main } from '../layout/main/Main';
import { Header } from '../layout/header/Header';
import { Container } from '../components/container/Container';
import { useAppSelector } from './store';
import { Snackbar } from '../components/SnackBar/SnackBar';
import { ProgressLinear } from '../components/ProgressLinear/ProgressLinear';
import { Outlet } from 'react-router-dom';
import { Todos } from '../features/todos/Todos';

function App() {
	const error = useAppSelector(state => state.app.error);
	const status = useAppSelector(state => state.app.status);

	return (
		<div className='App'>
			<Snackbar status={status} error={error} />
			<Header />
			{status === 'loading' && <ProgressLinear />}
			<Main>
				<Container width={'1440px'}>
					<Outlet />
				</Container>
			</Main>
		</div>
	);
}

export default App;
