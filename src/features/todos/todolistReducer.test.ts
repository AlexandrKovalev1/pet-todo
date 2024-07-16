import { v4 } from 'uuid';
import { TodolistType } from 'features/todos/api/todolists-api';
import {
	todolistActions,
	TodolistDomainType,
	todolistSlice,
	todoListThunks,
} from 'features/todos/model/_tests_/todolistSlice';
import { ActionForTest } from 'common/types/ActionForTest';

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
		let action = todoListThunks.deleteTodoList.fulfilled({ todoId: initState[0].id }, '', '');

		let newState = todolistSlice(initState, action);
		expect(newState.length).toBe(0);
	});

	it('should be update heading todo', () => {
		const action: ActionForTest<typeof todolistActions.editTitleTodo> = {
			type: todolistActions.editTitleTodo.type,
			payload: { todoId: initState[0].id, newTitle: 'First TodoList' },
		};
		let newState = todolistSlice(initState, action);

		expect(newState[0].title).toBe('First TodoList');
	});

	it('should be update filter from todo', () => {
		const action: ActionForTest<typeof todolistActions.setFilterTodolist> = {
			type: todolistActions.setFilterTodolist.type,
			payload: {
				todoId: initState[0].id,
				filter: 'Active',
			},
		};
		let newState = todolistSlice(initState, action);

		expect(newState.length).toBe(1);
		expect(newState[0].filter).toBe('Active');
	});

	it('todolists should be set to the state', () => {
		const action: ActionForTest<typeof todoListThunks.getTodos.fulfilled> = {
			type: todoListThunks.getTodos.fulfilled.type,
			payload: {
				todolists: todolists,
			},
		};
		let newState = todolistSlice(initState, action);

		expect(newState.length).toBe(2);
		expect(newState[0].filter).toBeDefined();
		expect(newState[1].filter).toBe('All');
	});
});
