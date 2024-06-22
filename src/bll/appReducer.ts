let InitialState: AppStateType = {
	status: 'failed',
	error: null,
};

export const appReducer = (
	state: AppStateType = InitialState,
	action: AppReducerActionType,
) => {
	switch (action.type) {
		case 'SET_STATUS': {
			if (action.status !== 'failed' && state.error) {
				return { ...state, status: action.status, error: null };
			} else {
				return { ...state, status: action.status };
			}
		}
		case 'SET_ISERROR': {
			return { ...state, error: action.error };
		}
		default:
			return state;
	}
};

//Action Creators
export const setStatusAC = (status: RequestStatusType) =>
	({ type: 'SET_STATUS', status }) as const;

export const setErrorAC = (error: string) =>
	({
		type: 'SET_ISERROR',
		error,
	}) as const;

//types

export type AppReducerActionType = SetStatusType | SetErrorType;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppStateType = {
	status: RequestStatusType;
	error: string | null;
};

export type SetStatusType = ReturnType<typeof setStatusAC>;
export type SetErrorType = ReturnType<typeof setErrorAC>;
