import { Task } from 'features/task/ui/Task';
import styled from 'styled-components';
import { tasksThunks } from 'features/task/model/tasksSlice';
import { FilterType } from 'features/todos/model/_tests_/todolistSlice';
import { filterTasks } from 'common/utils/filterTasks';
import { FC, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import { AddItemForm } from 'common/components/addItemForm/AddItemForm';
import { FilterMenu } from 'features/todos/ui/todoLIst/filterMenu/FilterMenu';
import { ShadowWrapper } from 'common/components/shadowWrapper/ShadowWrapper';

type Props = {
	todoId: string;
	title: string;
	filter: FilterType;
};

export const TodoList: FC<Props> = ({ filter, todoId, title }) => {
	const [openSettings, setOpenSettings] = useState(false);
	const dispatch = useAppDispatch();
	const tasks = useAppSelector(state => state.tasks[todoId]);

	const addTask = useCallback(
		(title: string) => {
			dispatch(tasksThunks.addTask({ todoId, title }));
		},
		[dispatch, todoId],
	);

	const filteredTasks = filterTasks(filter, tasks);

	return (
		<ShadowWrapper>
			{/*<Loader />*/}
			<TodoWrapper>
				<MenuAndFilter>
					<small>
						Filter:<FilterText>{filter}</FilterText>
					</small>
					<FilterMenu active={openSettings} setActive={setOpenSettings} filter={filter} todoId={todoId} />
				</MenuAndFilter>
				<TodoHeading>{title}</TodoHeading>
				<AddItemForm onClickFoo={addTask} />
				{filteredTasks?.map(task => (
					<Task
						key={task.id}
						title={task.title}
						status={task.status}
						taskId={task.id}
						todoId={todoId}
						entityStatus={task.entityStatus}
					/>
				))}
			</TodoWrapper>
		</ShadowWrapper>
	);
};

//styled Components
const TodoHeading = styled.h2`
	color: brown;
`;
const TodoWrapper = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px 0;
	gap: 10px;
	border-radius: 7px;
	background-color: rgba(255, 255, 255, 0.6);
`;
const FilterText = styled.b`
	color: green;
`;
const MenuAndFilter = styled.div``;
