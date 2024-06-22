import { FC } from 'react';
import { Button } from '../../../components/button/Button';
import { Icon } from '../../../components/icon/Icon';
import styled from 'styled-components';
import {
	deleteTodoListTC,
	FilterType,
	setFilterTodolistAC,
} from '../../../bll/todolistReducer';
import { useAppDispatch } from '../../../app/store';

type Props = {
	active: boolean;
	setActive: (open: boolean) => void;
	filter: FilterType;
	todoId: string;
};
export const FilterMenu: FC<Props> = ({
	active,
	setActive,
	filter,
	todoId,
	...rest
}) => {
	const dispatch = useAppDispatch();
	const deleteTodo = () => dispatch(deleteTodoListTC(todoId));
	const setOpen = () => setActive(true);
	const setClose = () => setActive(false);

	const setFilterAll = () => dispatch(setFilterTodolistAC(todoId, 'All'));
	const setFilterActive = () => dispatch(setFilterTodolistAC(todoId, 'Active'));

	const setFilterCompleted = () =>
		dispatch(setFilterTodolistAC(todoId, 'Completed'));

	return (
		<Wrapper>
			{!active && (
				<MenuIconWrapper onClick={setOpen}>
					<Icon
						iconId={'filterMenu'}
						viewBox={'0 0 4 15'}
						width={'4px'}
						height={'15px'}
					/>
				</MenuIconWrapper>
			)}
			{active && (
				<MenuBodyWrapper>
					<BtnClose onClick={setClose}>
						<Icon
							iconId={'closeIcon'}
							viewBox={'0 0 24 24'}
							width={'15px'}
							height={'15px'}
						/>
					</BtnClose>
					<h3>Change filter</h3>
					<Button
						styleType={'filter'}
						active={filter === 'All'}
						onClick={setFilterAll}
					>
						All
					</Button>
					<Button
						styleType={'filter'}
						active={filter === 'Active'}
						onClick={setFilterActive}
					>
						Active
					</Button>
					<Button
						styleType={'filter'}
						active={filter === 'Completed'}
						onClick={setFilterCompleted}
					>
						Completed
					</Button>
					<h3>Delete todolist</h3>
					<Button
						styleType={'filter'}
						className={'delete-todo'}
						onClick={deleteTodo}
					>
						Delete todolist
					</Button>
				</MenuBodyWrapper>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	& h3 {
		font-weight: bold;
		color: yellowgreen;
	}
`;
const MenuIconWrapper = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	padding: 15px;
	cursor: pointer;
`;

const MenuBodyWrapper = styled.div`
	position: absolute;
	background-color: rgba(255, 255, 255, 1);
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 5;

	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 20px;
	gap: 5px;
	border-radius: 7px;
	min-height: 200px;
	height: 100%;
	padding-bottom: 10px;

	& .delete-todo:hover {
		color: red;
	}
`;

const BtnClose = styled.div`
	position: absolute;
	right: 10px;
	top: 10px;
	cursor: pointer;

	&:hover svg {
		fill: red;
		stroke: red;
	}
`;
