import { createBrowserRouter, Navigate, RouteObject, Outlet } from 'react-router-dom';
import App from '../app/App';
import { Todos } from '../features/todos/Todos';
import { Login } from '../features/Login/Login';
import { useAppSelector } from '../app/store';
import * as React from 'react';

export const PATH = {
	ROOT: '/',
	TODOS: '/todolists',
	LOGIN: '/login'
} as const;


const publicRoutes: RouteObject[] = [
	{
		path: PATH.ROOT,
		element: <Navigate to={PATH.TODOS} />
	},
	{
		path: PATH.LOGIN,
		element: <Login />
	}
];
const privaleRoutes: RouteObject[] = [
	{
		path: PATH.TODOS,
		element: <Todos />
	}
];

const ProtectedRoute = () => {
	const isAuth = useAppSelector<boolean>(state => state.app.isAuth);
	return isAuth ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <>Error</>,
		children: [
			{
				element: <ProtectedRoute />,
				children: privaleRoutes
			},
			...publicRoutes
		]
	}
]);
