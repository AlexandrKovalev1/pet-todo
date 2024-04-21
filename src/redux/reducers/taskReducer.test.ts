import {
	addTaskAC,
	changeTaskStatusAC,
	tasksReducer,
	TasksType,
} from './tasksReducer';
import { v4 } from 'uuid';
import { addTodoAC, deleteTodoAC } from './todolistReducer';

let initialState: TasksType;

describe('tests for tasksReducer', () => {
	beforeEach(() => {
		let id1 = v4();

		initialState = {
			[id1]: [{ id: v4(), title: 'Good', isDone: false }],
		};
	});

	it('tasks array should to be added', () => {
		let action = addTodoAC('bla');

		let newState = tasksReducer(initialState, action);

		expect(Object.keys(newState).length).toBe(2);
		expect(newState[Object.keys(newState)[1]]).toBeDefined();
	});

	it('tasks should be removed', () => {
		let idFirstTodo = Object.keys(initialState)[0];
		let action = deleteTodoAC(idFirstTodo);

		let newState = tasksReducer(initialState, action);

		expect(Object.keys(newState).length).toBe(0);
		expect(newState).toEqual({});
	});

	it('task should be added', () => {
		let todoId = Object.keys(initialState)[0];
		let action = addTaskAC(todoId, 'New task');
		let newState = tasksReducer(initialState, action);

		expect(newState[todoId].length).toBe(2);
		expect(newState[todoId][1]).toBeDefined();
		expect(newState[todoId][0].title).toBe('New task');
	});

	it('task status should be changed', () => {
		let todoId = Object.keys(initialState)[0];
		let taskId = initialState[todoId][0].id;
		let action = changeTaskStatusAC(todoId, taskId, true);

		let newState = tasksReducer(initialState, action);

		expect(newState[todoId][0].isDone).toBe(true);
	});
});
