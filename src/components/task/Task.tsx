import { ChangeEvent, FC } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';
import { FilterType } from '../../redux/reducers/todolistReducer';
import { useDispatch } from 'react-redux';
import {
	changeTaskStatusAC,
	deleteTaskAC,
} from '../../redux/reducers/tasksReducer';

type Props = {
	title: string;
	isDone: boolean;
	taskId: string;
	todoId: string;
};
export const Task: FC<Props> = ({ title, isDone, taskId, todoId, ...rest }) => {
	let dispatch = useDispatch();

	const deleteTask = () => {
		dispatch(deleteTaskAC(todoId, taskId));
	};

	const changeTask = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeTaskStatusAC(todoId, taskId, e.currentTarget.checked));
	};
	return (
		<Wrapper isDone={isDone}>
			<input type='checkbox' checked={isDone} onChange={changeTask} />
			<StyledSpan isDone={isDone}>{title}</StyledSpan>
			<Button styleType={'remove'} onClick={deleteTask}>
				<Icon
					iconId={'iconTrash'}
					viewBox={'0 0 18 22'}
					width={'18px'}
					height={'22px'}
				/>
			</Button>
		</Wrapper>
	);
};

const Wrapper = styled.div<{ isDone: boolean }>`
	padding: 5px 15px;
	display: flex;
	align-items: center;
	gap: 15px;
	justify-content: space-between;
	width: 100%;

	${props =>
		props.isDone &&
		css<{ isDone: boolean }>`
			opacity: 0.5;
		`}

	&:hover {
		opacity: 1;
		background-color: rgba(0, 255, 255, 0.3);
		box-shadow:
			0 14px 28px rgba(0, 0, 0, 0.25),
			0 10px 10px rgba(0, 0, 0, 0.22);
	}
`;

const StyledSpan = styled.span<{ isDone: boolean }>`
	width: 100%;
	text-align: center;
	color: darkblue;
	${props =>
		props.isDone &&
		css<{ isDone: boolean }>`
			text-decoration: line-through;
		`}
`;
