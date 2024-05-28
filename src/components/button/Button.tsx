import { ButtonHTMLAttributes, FC } from 'react';
import styled, { css, StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

type Props = {
	styleType: 'addTodo' | 'remove' | 'filter';
	active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const Button: FC<Props> = ({ children, ...rest }) => {
	return (
		<StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>
			<StyledButton {...rest}>{children}</StyledButton>
		</StyleSheetManager>
	);
};

const StyledButton = styled.button<Props>`
	outline: none;
	border: none;
	background-color: unset;
	cursor: pointer;

	${props =>
		props.styleType === 'addTodo' &&
		css<Props>`
			border: none;
			border-radius: 2px;
			text-decoration: none;
			color: white;
			background: #9acd32;
			box-shadow: 0 2px 0 #749a25;
			padding: 3px 10px;

			&:hover {
				background: #749a25;
				box-shadow: none;
				position: relative;
				top: 1px;
			}

			&:disabled {
				opacity: 0.5;
				background: #749a25;
				box-shadow: none;
				position: relative;
				top: 0;
			}
		`}
	${props =>
		props.styleType === 'remove' &&
		css<Props>`
			&:hover {
				& svg {
					stroke: yellowgreen;
				}
			}
		`}

    ${props =>
		props.styleType === 'filter' &&
		css<Props>`
			font-size: 1rem;
			width: 100%;

			&:hover {
				font-weight: bold;
				background-color: rgba(0, 255, 255, 0.3);
				box-shadow:
					0 14px 28px rgba(0, 0, 0, 0.25),
					0 10px 10px rgba(0, 0, 0, 0.22);
			}

			${props =>
				props.active &&
				css<Props>`
					color: aqua;

					&:hover {
						color: black;
					}
				`}
		`}
`;
