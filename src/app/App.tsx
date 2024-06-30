import './App.css';
import { Main } from 'layout/main/Main';
import { Outlet } from 'react-router-dom';
import { Header } from 'layout/header/Header';
import React, { memo, useEffect } from 'react';
import { Sceleton } from 'components/sceleton/Sceleton';
import { SnackBar } from 'components/snackBar/SnackBar';
import { useAppDispatch, useAppSelector } from './store';
import { Container } from 'components/container/Container';
import { initializeAppTC, selectIsInitialized } from 'bll/appSlice';

const App = memo(() => {
	const dispatch = useAppDispatch();
	const initialized = useAppSelector(selectIsInitialized);

	useEffect(() => {
		dispatch(initializeAppTC());
	}, [dispatch]);

	if (!initialized) {
		return <Sceleton />;
	}

	return (
		<div className='App'>
			<SnackBar />
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
