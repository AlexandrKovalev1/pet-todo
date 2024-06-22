import { setErrorAC, setStatusAC } from '../bll/appReducer';
import { Dispatch } from 'redux';
import { ResponseType } from '../api/todolists-api';

export const serverNetworkError = <T>(
	dispatch: Dispatch,
	data: ResponseType<T>,
) => {
	if (data.messages.length) {
		dispatch(setErrorAC(data.messages[0]));
	} else {
		dispatch(setErrorAC('Something went wrong'));
	}
	dispatch(setStatusAC('failed'));
};

export const handleServerNetworkError = (
	dispatch: Dispatch,
	message: string,
) => {
	dispatch(setStatusAC('failed'));
	dispatch(setErrorAC(message));
};
