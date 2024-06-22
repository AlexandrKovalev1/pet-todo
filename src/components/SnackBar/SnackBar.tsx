import styled from 'styled-components';
import { FC, useEffect, useState } from 'react';

//todo сделать рефакторинг
const SnackbarStyled = styled.div`
	position: fixed;
	bottom: 15px;
	padding: 12px 30px;
	left: 50%;
	overflow: hidden;
	font-weight: bold;
	max-width: 40vw;
	min-width: 20vw;
	justify-content: space-between;
	align-items: center;
	border-radius: 10px;
	font-size: 1.5rem;
	z-index: 10;
	margin: 10px;
	color: #ffffff;
	letter-spacing: 2px;
	transform: translateX(-50%);
`;

const BtnClose = styled.button`
	all: unset;
	position: relative;
	display: inline-block;
	width: 20px;
	height: 20px;

	&:after,
	&:before {
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	&:hover:after,
	&:hover:before {
		border-color: black;
		cursor: pointer;
	}

	&:after {
		border-top: 2px solid white;
		transform: rotate(45deg) translateY(46%);
	}

	&:before {
		border-top: 2px solid white;
		transform: rotate(-45deg) translateY(46%);
	}
`;

export const Snackbar: FC<{
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error?: string | null;
}> = ({ status, error }) => {
	const [visible, setVisible] = useState<'none' | 'flex'>('none');
	let bgColor = '#749a25';
	let message = 'Loaded :-)';

	useEffect(() => {
		status !== 'idle' && setVisible('flex');
		status === 'idle' && visible === 'flex' && setVisible('none');
	}, [status, error]);

	if (status === 'loading') {
		message = 'Loading...';
	} else if (status === 'succeeded') {
		message = 'Loaded :-)';
	} else if (status === 'failed') {
		bgColor = 'red';
	}

	const onClickHandler = () => setVisible('none');

	return (
		<SnackbarStyled style={{ backgroundColor: bgColor, display: visible }}>
			<span>{error ? error : message}</span>
			<BtnClose onClick={onClickHandler} />
		</SnackbarStyled>
	);
};
