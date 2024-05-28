import { FC, useEffect, useState } from 'react';
import { ShadowWrapper } from '../shadowWrapper/ShadowWrapper';
import styled from 'styled-components';
import { AddItemForm } from '../addItemForm/AddItemForm';
import { FilterType } from '../../redux/reducers/todolistReducer';
import { FilterMenu } from './filterMenu/FilterMenu';
import { addTaskAC, getTasks } from '../../redux/reducers/tasksReducer';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { Task } from '../task/Task';
import { TaskStatuses, TaskType } from '../../api/task-api';

type Props = {
	todoId: string;
	title: string;
	filter: FilterType;
};
export const TodoList: FC<Props> = ({ filter, todoId, title, ...rest }) => {
	const [openSettings, setOpenSettings] = useState(false);

	let tasks = useAppSelector<TaskType[]>(state => state.tasks[todoId]);
	let dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getTasks(todoId));
	}, []);

	const addTask = (text: string) => {
		dispatch(addTaskAC(todoId, text));
	};

	function filterTasks(filter: FilterType, tasks: TaskType[]) {
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
				<h2 style={{ color: 'brown' }}>{title}</h2>
				<AddItemForm onClickFoo={addTask} />
				{filteredTasks.map(task => (
					<Task
						key={task.id}
						title={task.title}
						status={task.status}
						taskId={task.id}
						todoId={todoId}
					/>
				))}
			</TodoWrapper>
		</ShadowWrapper>
	);
};

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

const MenuAndFilter = styled.div`
	//& div div {
	//	position: absolute;
	//	top: 10px;
	//	right: 10px;
	//}
`;
