import { Dispatch } from 'redux';
import { ResponseType } from 'api/instance';
import { appActions } from 'bll/appSlice';

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
	if (data.messages.length) {
		dispatch(appActions.setError({ error: data.messages[0] }));
	} else {
		dispatch(appActions.setError({ error: 'Something went wrong' }));
	}
	dispatch(appActions.setStatus({ status: 'failed' }));
};

export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
	dispatch(appActions.setStatus({ status: 'failed' }));
	dispatch(appActions.setError({ error: message }));
};
