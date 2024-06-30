import { v4 } from 'uuid';
import { TodolistType } from 'api/todolists-api';
import { TaskPriorities, TaskStatuses } from 'api/task-api';
import { tasksActions, tasksSlice, TasksType } from 'bll/tasksSlice';
import { todolistActions } from 'bll/todolistSlice';

let initialState: TasksType;

describe('tests for tasksSlice', () => {
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
					entityStatus: 'idle',
				},
			],
		};
	});

	it('tasks array should to be added', () => {
		let action = todolistActions.addTodo({ todolist: { id: '444' } as TodolistType });

		let newState = tasksSlice(initialState, action);

		expect(Object.keys(newState).length).toBe(2);
		expect(newState[Object.keys(newState)[1]]).toBeDefined();
	});

	it('tasks should be removed', () => {
		let idFirstTodo = Object.keys(initialState)[0];
		let action = todolistActions.deleteTodo({ todoId: idFirstTodo });

		let newState = tasksSlice(initialState, action);

		expect(Object.keys(newState).length).toBe(0);
		expect(newState).toEqual({});
	});

	// it('task should be added', () => {
	// 	let todoId = Object.keys(initialState)[0];
	// 	let action = addTaskAC(todoId, 'New task');
	// 	let newState = tasksSlice(initialState, action);
	//
	// 	expect(newState[todoId].length).toBe(2);
	// 	expect(newState[todoId][1]).toBeDefined();
	// 	expect(newState[todoId][0].title).toBe('New task');
	// });

	it('task status should be changed', () => {
		let todoId = Object.keys(initialState)[0];
		let taskId = initialState[todoId][0].id;
		let action = tasksActions.changeTask({
			todoId,
			taskId,
			setting: {
				status: TaskStatuses.Completed,
			},
		});

		let newState = tasksSlice(initialState, action);

		expect(newState[todoId][0].status).toBe(TaskStatuses.Completed);
	});
});
