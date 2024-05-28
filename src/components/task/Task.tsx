import { ChangeEvent, FC } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';
import { useDispatch } from 'react-redux';
import {
	changeTaskStatusAC,
	deleteTaskAC,
	editTaskTitleAC,
} from '../../redux/reducers/tasksReducer';
import { EditableSpan } from '../editableSpan/EditableSpan';
import { TaskStatuses } from '../../api/task-api';

type Props = {
	title: string;
	status: TaskStatuses;
	taskId: string;
	todoId: string;
};
export const Task: FC<Props> = ({ title, status, taskId, todoId, ...rest }) => {
	let dispatch = useDispatch();

	let taskIsCompleted = status === TaskStatuses.Completed;
	const deleteTask = () => {
		dispatch(deleteTaskAC(todoId, taskId));
	};

	const changeTask = (e: ChangeEvent<HTMLInputElement>) => {
		let status = e.currentTarget.checked
			? TaskStatuses.Completed
			: TaskStatuses.New;

		dispatch(changeTaskStatusAC(todoId, taskId, status));
	};

	const editTaskTitle = (text: string) => {
		dispatch(editTaskTitleAC(todoId, taskId, text));
	};
	return (
		<Wrapper completed={taskIsCompleted}>
			<input type='checkbox' checked={taskIsCompleted} onChange={changeTask} />
			<EditableSpan status={status} title={title} editText={editTaskTitle} />
			{/*<StyledSpan isDone={isDone}>{title}</StyledSpan>*/}
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

const Wrapper = styled.div<{ completed: boolean }>`
	padding: 5px 15px;
	display: flex;
	align-items: center;
	gap: 15px;
	justify-content: space-between;
	width: 100%;

	${props =>
		props.completed &&
		css<{ completed: boolean }>`
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

const StyledSpan = styled.span<{ completed: boolean }>`
	width: 100%;
	text-align: center;
	color: darkblue;
	font-size: 1.7rem;
	${props =>
		props.completed &&
		css<{ completed: boolean }>`
			text-decoration: line-through;
		`}
`;
