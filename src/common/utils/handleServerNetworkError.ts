import { Dispatch } from 'redux';
import { appActions } from 'app/appSlice';
import axios from 'axios';

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
