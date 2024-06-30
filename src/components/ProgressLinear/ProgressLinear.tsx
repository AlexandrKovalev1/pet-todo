import styled from 'styled-components';
import { useAppSelector } from '../../app/store';
import React from 'react';
import { selectAppStatus } from '../../selectors/selectors';

type Props = {};
export const ProgressLinear = (props: Props) => {
	const status = useAppSelector(selectAppStatus);

	return <>{status === 'loading' && <Progress />}</>;
};

export const Progress = styled.progress`
	position: absolute;
	width: 100%;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border: none;
	height: 0.25em;
	color: #9acd32;
	background-color: rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.12);
	font-size: 16px;

	&::-webkit-progress-bar {
		background-color: transparent;
	}

	/* Determinate */

	&::-webkit-progress-value {
		background-color: currentColor;
		transition: all 0.2s;
	}

	&::-moz-progress-bar {
		background-color: currentColor;
		transition: all 0.2s;
	}

	&::-ms-fill {
		border: none;
		background-color: currentColor;
		transition: all 0.2s;
	}

	/* Indeterminate */

	&:indeterminate {
		background-size: 200% 100%;
		background-image: linear-gradient(
			to right,
			transparent 50%,
			currentColor 50%,
			currentColor 60%,
			transparent 60%,
			transparent 71.5%,
			currentColor 71.5%,
			currentColor 84%,
			transparent 84%
		);
		animation: pure-material-progress-linear 2s infinite linear;
	}

	.&:indeterminate::-moz-progress-bar {
		background-color: transparent;
	}

	&:indeterminate::-ms-fill {
		animation-name: none;
	}

	@keyframes pure-material-progress-linear {
		0% {
			background-size: 200% 100%;
			background-position: left -31.25% top 0%;
		}
		50% {
			background-size: 800% 100%;
			background-position: left -49% top 0%;
		}
		100% {
			background-size: 400% 100%;
			background-position: left -102% top 0%;
		}
	}
`;
