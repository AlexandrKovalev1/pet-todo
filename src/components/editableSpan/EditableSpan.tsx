import { ChangeEvent, FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { TaskStatuses } from '../../api/task-api';

type Props = {
	editText: (text: string) => void;
	status: TaskStatuses;
	title: string;
	disabled?: boolean;
};

//todo -приделать обработку ошибок
export const EditableSpan: FC<Props> = ({
	status,
	title,
	editText,
	disabled,
	...rest
}) => {
	const [isEdit, setIsEdit] = useState(false);
	const [text, setText] = useState(title);

	const setEdit = () => {
		!disabled && setIsEdit(true);
	};

	const editTaskTitle = () => {
		editText(text);
		setIsEdit(false);
		setText('');
	};

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.currentTarget.value);
	};

	return (
		<>
			{isEdit ? (
				<input
					type='text'
					value={text}
					autoFocus
					onBlur={editTaskTitle}
					onChange={onChangeHandler}
				/>
			) : (
				<StyledSpan
					$status={status === TaskStatuses.Completed}
					onDoubleClick={setEdit}
				>
					{title}
				</StyledSpan>
			)}
		</>
	);
};

const StyledSpan = styled.span<{ $status: boolean }>`
	width: 100%;
	text-align: center;
	color: darkblue;
	font-size: 1.7rem;
	${props =>
		props.$status &&
		css<{ $status: boolean }>`
			text-decoration: line-through;
		`}
`;
