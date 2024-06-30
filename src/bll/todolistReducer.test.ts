import { todolistActions, TodolistDomainType, todolistSlice } from 'bll/todolistSlice';
import { v4 } from 'uuid';
import { TodolistType } from '../api/todolists-api';

let initState: TodolistDomainType[] = [];
let todolists: TodolistType[];
describe('reducer test', () => {
	beforeEach(() => {
		initState = [
			{
				id: v4(),
				title: 'First Todo',
				filter: 'All',
				entityStatus: 'idle',
				addedDate: '',
				order: 0,
			},
		];

		todolists = [
			{ id: v4(), title: 'First Todo', addedDate: '', order: 0 },
			{ id: v4(), title: 'Second Todo', addedDate: '', order: 0 },
		];
	});

	// it('should be add todo', () => {
	// 	let action = addTodoAC('New Todo');
	// 	let newState = todolistSlice(initState, action);
	//
	// 	expect(newState.length).toBe(2);
	// 	expect(newState[1].title).toBe('New Todo');
	// });

	it('should be removed todo', () => {
		let action = todolistActions.deleteTodo({ todoId: initState[0].id });

		let newState = todolistSlice(initState, action);
		expect(newState.length).toBe(0);
	});

	it('should be update heading todo', () => {
		let action = todolistActions.editTitleTodo({ todoId: initState[0].id, newTitle: 'First TodoList' });
		let newState = todolistSlice(initState, action);

		expect(newState[0].title).toBe('First TodoList');
	});

	it('should be update filter from todo', () => {
		let action = todolistActions.setFilterTodolist({ todoId: initState[0].id, filter: 'Active' });
		let newState = todolistSlice(initState, action);

		expect(newState.length).toBe(1);
		expect(newState[0].filter).toBe('Active');
	});

	it('todolists should be set to the state', () => {
		let action = todolistActions.setTodoLists({ todolists });
		let newState = todolistSlice(initState, action);

		expect(newState.length).toBe(2);
		expect(newState[0].filter).toBeDefined();
		expect(newState[1].filter).toBe('All');
	});
});
