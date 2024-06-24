import './App.css';
import React, { memo, useEffect } from 'react';
import { Main } from '../layout/main/Main';
import { Header } from '../layout/header/Header';
import { Container } from '../components/container/Container';
import { useAppDispatch, useAppSelector } from './store';
import { Outlet } from 'react-router-dom';
import { initializeAppTC } from '../bll/appReducer';
import { Sceleton } from '../components/sceleton/Sceleton';
import { SnackBar } from '../components/snackBar/SnackBar';

const App = memo(() => {
	const dispatch = useAppDispatch();
	const initialized = useAppSelector(state => state.app.initialized);

	useEffect(() => {
		dispatch(initializeAppTC());
	}, [dispatch]);

	// if (!initialized) {
	// 	return <Sceleton/>
	// }

	return (
		<div className="App">
			<SnackBar/>
			<Header />
			<Main>
				<Container width={'1440px'}>
					<Outlet />
				</Container>
			</Main>
		</div>
	);
});

export default App;
