import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from 'app/store';
import { PATH } from 'routes/routes';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from 'selectors/selectors';
import { loginTC } from 'bll/authSlice';

const loginSchema = Yup.object().shape({
	password: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
});

type Props = {};

export const Login = (props: Props) => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
		onSubmit: values => {
			dispatch(loginTC(values));
		},
		validationSchema: loginSchema,
		validate: values => {
			if (!values.email) {
				return {
					email: 'Email is required',
				};
			}
			if (!values.password) {
				return {
					password: 'Password is required',
				};
			}
		},
	});

	let buttonDisabled = !!Object.keys(formik.errors).length;

	if (isAuth) {
		return <Navigate to={PATH.ROOT} />;
	}

	return (
		<Container>
			<FormWrapper>
				<Heading>Login</Heading>
				<Form onSubmit={formik.handleSubmit}>
					<Input
						type='text'
						id='email'
						placeholder='Email'
						required
						$error={!!formik.errors.email}
						{...formik.getFieldProps('email')}
					/>
					{formik.touched.email && formik.errors.email && <ErrorBlock>{formik.errors.email}</ErrorBlock>}
					<Input
						type='password'
						id='password'
						placeholder='Password'
						autoComplete={'on'}
						required
						$error={!!formik.errors.password}
						{...formik.getFieldProps('password')}
					/>
					{formik.touched.password && formik.errors.password && <ErrorBlock>{formik.errors.password}</ErrorBlock>}
					<div>
						<Button type='submit' disabled={buttonDisabled}>
							Login
						</Button>
						<Label>
							<span>remember me</span>
							<input
								type={'checkbox'}
								id={'rememberMe'}
								checked={formik.values.rememberMe}
								{...formik.getFieldProps('rememberMe')}
							/>
						</Label>
					</div>
				</Form>
			</FormWrapper>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	max-width: 400px;
	margin: 0 auto;
`;

const FormWrapper = styled.div`
	width: 100%;
	background-color: #f8f8f8;
	padding: 20px;
	border-radius: 12px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
	text-align: center;
	color: #333;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input<{ $error: boolean }>`
	padding: 10px;
	margin-bottom: 12px;
	border: 2px solid #ddd;
	border-radius: 8px;
	transition: border-color 0.3s ease-in-out;
	outline: none;
	color: #333;
	background-color: #f4f4f4;

	&:focus {
		border-color: #ff9900;
	}

	${props =>
		props.$error &&
		css<{ $error: boolean }>`
			border-color: red;
		`}
`;

const Button = styled.button`
	width: 100%;
	background-color: #ff9900;
	color: #fff;
	padding: 10px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.3s ease-in-out;

	&:hover {
		background-color: #ff6600;
	}

	&:disabled {
		opacity: 0.5;
		cursor: no-drop;

		&:hover {
			background-color: #ff9900;
		}
	}
`;

const Label = styled.label`
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 20px;
`;

const ErrorBlock = styled.div`
	color: red;
	font-weight: bold;
`;
