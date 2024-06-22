import styled from 'styled-components';

export const Loader = styled.div`
	width: 108px;
	height: 108px;
	border-radius: 50%;
	display: inline-block;
	position: relative;
	background: linear-gradient(0deg, rgba(51, 122, 183, 0.2) 33%, green 100%);
	box-sizing: border-box;
	animation: rotation 1s linear infinite;

	&::after {
		content: '';
		box-sizing: border-box;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 90px;
		height: 90px;
		border-radius: 50%;
		background: #ffffff;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
