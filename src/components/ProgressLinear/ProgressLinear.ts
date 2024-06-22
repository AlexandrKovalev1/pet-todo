import styled from 'styled-components';

export const ProgressLinear = styled.progress`
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
