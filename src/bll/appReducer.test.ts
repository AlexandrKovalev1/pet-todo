import {
	appReducer,
	AppStateType,
	setErrorAC,
	setStatusAC,
} from './appReducer';

let initialState: AppStateType;

describe('tests for appReducer', () => {
	beforeEach(() => {
		initialState = {
			status: 'idle',
			error: null,
		};
	});

	it('status should be updated', () => {
		let action = setStatusAC('loading');

		let newState = appReducer(initialState, action);

		expect(newState.status).toBe('loading');
	});

	it('error should be added', () => {
		let action = setErrorAC('some error');

		let newState = appReducer(initialState, action);
		expect(newState.error).toBe('some error');
	});
});
