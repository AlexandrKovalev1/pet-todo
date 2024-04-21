import { Button } from '../button/Button';
import styled from 'styled-components';
import { ChangeEvent, FC, useState, KeyboardEvent } from 'react';

type Props = {
	setError?: (error: string) => void;
	maxLength?: number;
	onClickFoo?: (text: string) => void;
};
export const AddItemForm: FC<Props> = ({
	setError,
	maxLength,
	onClickFoo,
	...rest
}) => {
	const [text, setText] = useState('');

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let textValue = e.currentTarget.value;
		if (maxLength) {
			if (textValue.length >= maxLength) {
				return setError?.(`Max length ${maxLength} symbols`);
			}
		}

		setText(textValue);
	};

	const onClickHandler = () => {
		if (!text.trim().length) {
			return setError?.('Requaired');
		}
		onClickFoo?.(text.trim());
		setText('');
	};

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (!text.trim().length) {
				return setError?.('Requaired');
			}
			onClickFoo?.(text.trim());
			setText('');
		}
	};

	return (
		<Wrapper>
			<input
				type='text'
				value={text}
				onChange={onChangeHandler}
				autoFocus
				onKeyDown={onKeyPressHandler}
			/>
			<Button styleType={'addTodo'} onClick={onClickHandler}>
				+
			</Button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;
