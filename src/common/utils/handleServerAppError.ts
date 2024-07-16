import { Dispatch } from 'redux';
import { BaseResponse } from 'common/types/BaseResponse';
import { appActions } from 'app/appSlice';

export const handleServerAppError = <T>(dispatch: Dispatch, data: BaseResponse<T>) => {
	if (data.messages.length) {
		dispatch(appActions.setError({ error: data.messages[0] }));
	} else {
		dispatch(appActions.setError({ error: 'Something went wrong' }));
	}
	dispatch(appActions.setStatus({ status: 'failed' }));
};
