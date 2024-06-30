import { appActions, appSlice, AppStateType } from 'bll/appSlice';

let initialState: AppStateType;

describe('tests for appSlice', () => {
	beforeEach(() => {
		initialState = {
			status: 'failed',
			error: null,
			id: null,
			login: null,
			email: null,
			initialized: false,
		};
	});

	it('status should be updated', () => {
		let action = appActions.setStatus({ status: 'loading' });

		let newState = appSlice(initialState, action);

		expect(newState.status).toBe('loading');
	});

	it('error should be added', () => {
		let action = appActions.setError({ error: 'some error' });

		let newState = appSlice(initialState, action);
		expect(newState.error).toBe('some error');
	});
});
