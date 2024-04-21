import { AddItemForm } from '../addItemForm/AddItemForm';
import { ShadowWrapper } from '../shadowWrapper/ShadowWrapper';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addTodoAC } from '../../redux/reducers/todolistReducer';

type Props = {};
export const CreateTodolist = (props: Props) => {
	const dispatch = useDispatch();
	const addTodo = (title: string) => {
		dispatch(addTodoAC(title));
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
