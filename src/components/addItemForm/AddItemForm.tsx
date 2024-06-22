import { Button } from '../button/Button';
import styled, { css } from 'styled-components';
import { ChangeEvent, FC, useState, KeyboardEvent } from 'react';

type Props = {
	onClickFoo?: (text: string) => void;
	disabled?: boolean;
};
export const AddItemForm: FC<Props> = ({ onClickFoo, disabled, ...rest }) => {
	const [text, setText] = useState('');
	const [error, setError] = useState('');
	let maxLength = 20;
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let textValue = e.currentTarget.value;
		if (textValue.length >= maxLength) {
			return setError(`Max length ${maxLength} symbols`);
		}
		error && setError('');
		setText(textValue);
	};

	const onClickHandler = () => {
		if (!text.trim().length) {
			return setError('Requaired');
		}
		onClickFoo?.(text.trim());
		setText('');
	};

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (!text.trim().length) {
				return setError('Requaired');
			}

			onClickFoo?.(text.trim());
			setText('');
		}
	};

	return (
		<Wrapper>
			<InputBlock>
				<InputStyled
					type='text'
					value={text}
					onChange={onChangeHandler}
					autoFocus
					onKeyDown={onKeyPressHandler}
					error={error}
					disabled={disabled}
				/>
				<Button
					styleType={'addTodo'}
					onClick={onClickHandler}
					disabled={!text || !!error || disabled}
				>
					+
				</Button>
			</InputBlock>
			{error && <Error>{error}</Error>}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const Error = styled.b`
	color: red;
`;

const InputBlock = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

const InputStyled = styled.input<{ error: string }>`
	border: 1px solid #749a25;
	outline: none;
	padding: 5px 2px;

	${props =>
		props.error &&
		css<{ error: string }>`
			border: 2px solid red;
		`}
`;
