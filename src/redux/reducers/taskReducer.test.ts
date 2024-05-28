import {
	addTaskAC,
	changeTaskStatusAC,
	tasksReducer,
	TasksType,
} from './tasksReducer';
import { v4 } from 'uuid';
import { addTodoAC, deleteTodoAC, setTodoListsAC } from './todolistReducer';
import { TaskPriorities, TaskStatuses } from '../../api/task-api';

let initialState: TasksType;

describe('tests for tasksReducer', () => {
	beforeEach(() => {
		let id1 = v4();

		initialState = {
			[id1]: [
				{
					id: v4(),
					title: 'Good',
					status: TaskStatuses.Completed,
					description: '',
					todoListId: '',
					order: 0,
					priority: TaskPriorities.Hi,
					addedDate: '',
					startDate: '',
					deadline: '',
				},
			],
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
		let action = changeTaskStatusAC(todoId, taskId, TaskStatuses.Completed);

		let newState = tasksReducer(initialState, action);

		expect(newState[todoId][0].status).toBe(TaskStatuses.Completed);
	});

	it('tasks should be added', () => {
		let action = setTodoListsAC([
			{ id: '1', title: 'First Todo', addedDate: '', order: 0 },
			{ id: '2', title: 'Second Todo', addedDate: '', order: 0 },
		]);
		let newState = tasksReducer({}, action);

		expect(newState['1']).toStrictEqual([]);
	});
});
