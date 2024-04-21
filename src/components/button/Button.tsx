import { ButtonHTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '../icon/Icon';

type Props = {
	styleType: 'addTodo' | 'remove' | 'filter';
	active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const Button: FC<Props> = ({ children, ...rest }) => {
	return <StyledButton {...rest}>{children}</StyledButton>;
};

const StyledButton = styled.button<Props>`
	outline: none;
	border: none;
	background-color: unset;
	cursor: pointer;

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
