import { ChangeEvent, FC } from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'common/components/button/Button';
import { Icon } from 'common/components/icon/Icon';
import { tasksThunks } from 'features/task/model/tasksSlice';
import { EditableSpan } from 'common/components/editableSpan/EditableSpan';
import { useAppDispatch } from 'app/store';
import { RequestStatusType } from 'app/appSlice';
import { TaskStatuses } from 'common/enums/enums';

type Props = {
	title: string;
	status: TaskStatuses;
	taskId: string;
	todoId: string;
	entityStatus: RequestStatusType;
};
export const Task: FC<Props> = ({ title, status, taskId, todoId, entityStatus, ...rest }) => {
	let dispatch = useAppDispatch();

	let disable = entityStatus === 'loading';

	let taskIsCompleted = status === TaskStatuses.Completed;
	const deleteTask = () => {
		dispatch(tasksThunks.deleteTask({ todoId, taskId }));
	};

	const changeTask = (e: ChangeEvent<HTMLInputElement>) => {
		let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;

		dispatch(tasksThunks.changeTask({ todoId, taskId, setting: { status } }));
	};

	const editTaskTitle = (title: string) => {
		dispatch(
			tasksThunks.changeTask({
				todoId,
				taskId,
				setting: {
					title,
				},
			}),
		);
	};
	return (
		<Wrapper $completed={taskIsCompleted} disabled={disable}>
			<input type='checkbox' checked={taskIsCompleted} onChange={changeTask} disabled={disable} />
			<EditableSpan status={status} title={title} editText={editTaskTitle} disabled={disable} />
			<Button styleType={'remove'} onClick={deleteTask} disabled={disable}>
				<Icon iconId={'iconTrash'} viewBox={'0 0 18 22'} width={'18px'} height={'22px'} />
			</Button>
		</Wrapper>
	);
};

const Wrapper = styled.div<{ $completed: boolean; disabled?: boolean }>`
	padding: 5px 15px;
	display: flex;
	align-items: center;
	gap: 15px;
	justify-content: space-between;
	width: 100%;


	${props =>
		props.$completed &&
		css<{ $completed: boolean }>`
			opacity: 0.5;
		`}

	&:hover {
		opacity: 1;
		background-color: rgba(0, 255, 255, 0.3);
		box-shadow:
			0 14px 28px rgba(0, 0, 0, 0.25),
			0 10px 10px rgba(0, 0, 0, 0.22);
	}

	${props =>
		props.disabled &&
		css<{ $completed: boolean; disabled?: boolean }>`
			cursor: no-drop;
			opacity: 0.4;
			&:hover {
				opacity: 0.4;
			}
		`}
}

`;
