// @flow
import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import 'react-toastify/dist/ReactToastify.css'
import { setErrorAC } from '../../bll/appReducer';

type Props = {};
export const SnackBar = (props: Props) => {

	const errorMessage = useAppSelector(state => state.app.error);

	console.log(errorMessage)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (errorMessage) {
			toast.error(errorMessage);
			dispatch(setErrorAC(null))
		}

	}, [errorMessage,dispatch]);
	return (

		<div style={{position:'absolute'}}>
			<ToastContainer  theme="dark" autoClose={3000} position={'bottom-center'}/>
		</div>

	);
};