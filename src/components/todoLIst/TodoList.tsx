import { FC, useState } from 'react';
import { ShadowWrapper } from '../shadowWrapper/ShadowWrapper';
import styled from 'styled-components';
import { AddItemForm } from '../addItemForm/AddItemForm';
import { FilterType } from '../../redux/reducers/todolistReducer';
import { FilterMenu } from './filterMenu/FilterMenu';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAC, TaskType } from '../../redux/reducers/tasksReducer';
import { RootStateType } from '../../redux/store/store';
import { Task } from '../task/Task';

type Props = {
	todoId: string;
	title: string;
	filter: FilterType;
};
export const TodoList: FC<Props> = ({ filter, todoId, title, ...rest }) => {
	const [openSettings, setOpenSettings] = useState(false);

	let tasks = useSelector<RootStateType, TaskType[]>(
		state => state.tasks[todoId],
	);
	let dispatch = useDispatch();

	const addTask = (text: string) => {
		dispatch(addTaskAC(todoId, text));
	};

	function filterTasks(filter: FilterType, tasks: TaskType[]) {
		if (filter === 'Completed') {
			return tasks.filter(task => task.isDone);
		}
		if (filter === 'Active') {
			return tasks.filter(task => !task.isDone);
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
				<h2 style={{ color: 'darkblue' }}>{title}</h2>
				<AddItemForm onClickFoo={addTask} />
				{filteredTasks.map(task => (
					<Task
						key={task.id}
						title={task.title}
						isDone={task.isDone}
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
