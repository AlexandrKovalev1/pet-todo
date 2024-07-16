import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { appActions, selectError } from 'app/appSlice';
import { useAppDispatch, useAppSelector } from 'app/store';

type Props = {};
export const SnackBar = (props: Props) => {
	const errorMessage = useAppSelector(selectError);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (errorMessage) {
			toast.error(errorMessage);
			dispatch(appActions.setError({ error: null }));
		}
	}, [errorMessage, dispatch]);
	return (
		<div style={{ position: 'absolute' }}>
			<ToastContainer theme='dark' autoClose={3000} position={'bottom-center'} />
		</div>
	);
};
