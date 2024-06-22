// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
//
// const loginSchema = Yup.object().shape({
// 	password: Yup.string()
// 		.min(8, 'Too Short!')
// 		.max(50, 'Too Long!')
// 		.required('Required'),
// 	email: Yup.string().email('Invalid email').required('Required'),
// });
//
// type Props = {};
// export const Login = (props: Props) => {
// 	const handleSubmit = (
// 		values: { email: string; password: string },
// 		{ setSubmitting },
// 	) => {
// 		setTimeout(() => {
// 			alert(JSON.stringify(values, null, 2));
// 			setSubmitting(false);
// 		}, 400);
// 	};
//
// 	return (
// 		<>
// 			<h1>Login</h1>
// 			<Formik
// 				initialValues={{ email: '', password: '' }}
// 				validationSchema={loginSchema}
// 				onSubmit={handleSubmit}
// 			>
// 				{({ isSubmitting }) => {
// 					return (
// 						<Form>
// 							<label>
// 								Email: <Field type='email' name='email' />
// 								<ErrorMessage name='email' component='div' />
// 							</label>
// 							<label>
// 								Password:
// 								<Field type='password' name='password' />
// 								<ErrorMessage name='password' component='div' />
// 							</label>
// 							<button type='submit' disabled={isSubmitting}>
// 								Submit
// 							</button>
// 						</Form>
// 					);
// 				}}
// 			</Formik>
// 		</>
// 	);
// };

// @flow
import * as React from 'react';

type Props = {};
export const Login = (props: Props) => {
	return <div></div>;
};
