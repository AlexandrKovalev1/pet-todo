import App from '../app/App';
import { useAppSelector } from 'app/store';
import { Todos } from 'features/todos/Todos';
import { Login } from 'features/login/Login';
import { ErrorPage } from 'components/ErrorPage/ErrorPage';
import { createBrowserRouter, Navigate, RouteObject, Outlet } from 'react-router-dom';
import { selectIsAuth } from 'bll/authSlice';

export const PATH = {
	ROOT: '/',
	TODOS: '/todolists',
	LOGIN: '/login',
	ERROR: '/error',
} as const;

const publicRoutes: RouteObject[] = [
	{
		index: true,
		element: <Navigate to={PATH.TODOS} />,
	},
	{
		path: PATH.LOGIN,
		element: <Login />,
	},
	{
		path: PATH.ERROR,
		element: <ErrorPage />,
	},
];
const privateRoutes: RouteObject[] = [
	{
		path: PATH.TODOS,
		element: <Todos />,
	},
];

const ProtectedRoute = () => {
	const isAuth = useAppSelector<boolean>(selectIsAuth);
	return isAuth ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Navigate to={PATH.ERROR} />,
		children: [
			{
				element: <ProtectedRoute />,
				children: privateRoutes,
			},
			...publicRoutes,
		],
	},
]);
