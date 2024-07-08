import { Dispatch } from 'redux';
import { ResponseType } from 'api/instance';
import { appActions } from 'bll/appSlice';
import axios from 'axios';

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
	if (data.messages.length) {
		dispatch(appActions.setError({ error: data.messages[0] }));
	} else {
		dispatch(appActions.setError({ error: 'Something went wrong' }));
	}
	dispatch(appActions.setStatus({ status: 'failed' }));
};

export const handleServerNetworkError = (err: unknown, dispatch: Dispatch) => {
	let errorMessage = 'Some error occurred';
	if (axios.isAxiosError(err)) {
		errorMessage = err.response?.data?.message || err?.message || errorMessage;
	} else if (err instanceof Error) {
		errorMessage = `Native error : ${err.message}`;
	} else {
		errorMessage = JSON.stringify(err);
	}
	dispatch(appActions.setStatus({ status: 'failed' }));
	dispatch(appActions.setError({ error: errorMessage }));
};
