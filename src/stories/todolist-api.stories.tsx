import { useEffect, useState } from 'react';
import { todolistsApi } from '../api/todolists-api';
import { tasksApi } from '../api/task-api';

export default {
	title: 'API',
};

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null);

	useEffect(() => {
		todolistsApi.getTodolists().then(response => setState(response.data));
	}, []);

	return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null);

	useEffect(() => {
		todolistsApi
			.createTodolist('NewTodoTest')
			.then(response => setState(response.data));
	}, []);

	return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTodolist = () => {
	const [state, setState] = useState<any>(null);
	const [todoId, setTodoId] = useState('');
	const [title, setTitle] = useState('');

	const onClickHandler = () => {
		todolistsApi
			.updateTodolist(todoId, title)
			.then(response => setState(response.data));
	};
	return (
		<>
			<div>{JSON.stringify(state)}</div>
			<input
				type='text'
				placeholder={'TodoId'}
				value={todoId}
				onChange={e => setTodoId(e.currentTarget.value)}
			/>
			<input
				type='text'
				placeholder={'New title'}
				value={title}
				onChange={e => setTitle(e.currentTarget.value)}
			/>
			<button onClick={onClickHandler}>Update Title</button>
		</>
	);
};
export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null);
	const [todoId, setTodoId] = useState('');

	const onClickHandler = () => {
		todolistsApi
			.deleteTodolist(todoId)
			.then(response => setState(response.data));
	};

	new Promise((res, rej) => res(4)).then(data => console.log(data));
	return (
		<>
			<div>{JSON.stringify(state)}</div>
			<input
				type='text'
				placeholder={'todoId'}
				value={todoId}
				onChange={e => setTodoId(e.currentTarget.value)}
			/>
			<button onClick={onClickHandler}>DELETE TODO</button>
		</>
	);
};

export const GetTasks = () => {
	const [state, setState] = useState<any>(null);

	useEffect(() => {
		tasksApi
			.getTasks('26fb69c9-4c6d-4935-92e0-3124db1aac2a')
			.then(response => setState(response.data));
	}, []);

	return <div>{JSON.stringify(state)}</div>;
};
export const CreateTask = () => {
	// const [state, setState] = useState<any>(null);
	//
	//
	// useEffect(() => {
	// 	todolistsApi
	// 		.createTask('3c4d3e68-33c7-4601-955f-1bbace4a7ce2', 'NEW TASK')
	// 		.then(response => setState(response.data));
	// }, []);
	//
	// return <div>{JSON.stringify(state)}</div>;
	const [state, setState] = useState<any>(null);
	const [todoId, setTodoId] = useState('');
	const [taskTitle, setTaskTitle] = useState('');

	const onClickHandler = () => {
		tasksApi
			.createTask(todoId, taskTitle)
			.then(response => setState(response.data));
	};
	return (
		<>
			<div>{JSON.stringify(state)}</div>
			<input
				type='text'
				placeholder={'TodoId'}
				value={todoId}
				onChange={e => setTodoId(e.currentTarget.value)}
			/>
			<input
				type='text'
				placeholder={'TASKTITLE'}
				value={taskTitle}
				onChange={e => setTaskTitle(e.currentTarget.value)}
			/>
			<button onClick={onClickHandler}>Create Task</button>
		</>
	);
};
export const UpdateTask = () => {
	const [state, setState] = useState<any>(null);

	useEffect(() => {
		tasksApi
			.updateTask(
				'3c4d3e68-33c7-4601-955f-1bbace4a7ce2',
				'e910e42a-92c6-44fc-98bb-c68acccae31e',
				'updateddd',
			)
			.then(response => setState(response.data));
	}, []);

	return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTask = () => {
	const [state, setState] = useState<any>(null);

	useEffect(() => {
		tasksApi
			.deleteTask(
				'3c4d3e68-33c7-4601-955f-1bbace4a7ce2',
				'5a9cce96-1578-4dea-9e75-7a55df467b12',
			)
			.then(response => setState(response.data));
	}, []);

	return <div>{JSON.stringify(state)}</div>;
};
