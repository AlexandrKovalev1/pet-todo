import { Task } from '../task/Task';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'app/store';
import { addTaskTC } from 'bll/tasksSlice';
import { FilterType } from 'bll/todolistSlice';
import { filterTasks } from 'utils/filterTasks';
import { FilterMenu } from './filterMenu/FilterMenu';
import { AddItemForm } from 'components/addItemForm/AddItemForm';
import { ShadowWrapper } from 'components/shadowWrapper/ShadowWrapper';

type Props = {
	todoId: string;
	title: string;
	filter: FilterType;
};

export const TodoList: FC<Props> = ({ filter, todoId, title, ...rest }) => {
	const [openSettings, setOpenSettings] = useState(false);
	const dispatch = useAppDispatch();
	const tasks = useAppSelector(state => state.tasks[todoId]);

	const addTask = (text: string) => {
		dispatch(addTaskTC(todoId, text));
	};

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
