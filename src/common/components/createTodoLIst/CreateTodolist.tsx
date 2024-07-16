import styled from 'styled-components';
import { useAppDispatch } from 'app/store';
import { AddItemForm } from '../addItemForm/AddItemForm';
import { ShadowWrapper } from '../shadowWrapper/ShadowWrapper';
import { todoListThunks } from 'features/todos/model/_tests_/todolistSlice';

type Props = {};
export const CreateTodolist = (props: Props) => {
	const dispatch = useAppDispatch();
	const addTodo = (title: string) => {
		dispatch(todoListThunks.addTodo(title));
	};
	return (
		<ShadowWrapper>
			<Wrapper>
				<h2>Введите название</h2>
				<AddItemForm onClickFoo={addTodo} />
			</Wrapper>
		</ShadowWrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	padding: 15px;
	background-color: rgba(255, 255, 255, 0.8);
`;
