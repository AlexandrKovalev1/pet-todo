import { createBrowserRouter } from 'react-router-dom';
import App from '../app/App';
import { Todos } from '../features/todos/Todos';

export const PATH = {
	ROOT: '/',
	TODOS: '/todolists',
} as const;

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <>Error</>,
		children: [
			{
				path: PATH.TODOS,
				element: <Todos />,
			},
		],
	},
]);
