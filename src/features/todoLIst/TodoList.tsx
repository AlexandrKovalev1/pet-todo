import { Task } from '../task/Task';

import { FC, useEffect, useState } from 'react';
import { FilterMenu } from './filterMenu/FilterMenu';
import { AddItemForm } from '../../components/addItemForm/AddItemForm';
import { ShadowWrapper } from '../../components/shadowWrapper/ShadowWrapper';
import { FilterType } from '../../bll/todolistReducer';
import { addTaskTC, getTasksTC, TaskDomainType } from '../../bll/tasksReducer';
import { TaskStatuses } from '../../api/task-api';
import { useAppDispatch, useAppSelector } from '../../app/store';
import styled from 'styled-components';

type Props = {
	todoId: string;
	title: string;
	filter: FilterType;
};
export const TodoList: FC<Props> = ({ filter, todoId, title, ...rest }) => {
	const [openSettings, setOpenSettings] = useState(false);

	let tasks = useAppSelector<TaskDomainType[]>(state => state.tasks[todoId]);
	let dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getTasksTC(todoId));
	}, [dispatch, todoId]);

	const addTask = (text: string) => {
		dispatch(addTaskTC(todoId, text));
	};

	function filterTasks(filter: FilterType, tasks: TaskDomainType[]) {
		if (filter === 'Completed') {
			return tasks.filter(task => task.status === TaskStatuses.Completed);
		}
		if (filter === 'Active') {
			return tasks.filter(task => task.status === TaskStatuses.New);
		}
		return tasks;
	}

	let filteredTasks = filterTasks(filter, tasks);

	return (
		<ShadowWrapper>
			{/*<Loader />*/}
			<TodoWrapper>
				<MenuAndFilter>
					<small>
						Filter:<FilterText>{filter}</FilterText>
					</small>
					<FilterMenu
						active={openSettings}
						setActive={setOpenSettings}
						filter={filter}
						todoId={todoId}
					/>
				</MenuAndFilter>
				<TodoHeading>{title}</TodoHeading>
				<AddItemForm onClickFoo={addTask} />
				{filteredTasks.map(task => (
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

//styles
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
