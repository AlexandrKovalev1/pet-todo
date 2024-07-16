import styled from 'styled-components';

type ContainerPropsType = {
	width: string;
};
export const Container = styled.div<ContainerPropsType>`
	max-width: ${props => props.width};
	width: 100%;
	height: 100%;
	margin: 0 auto;

	@media (max-width: ${props => props.width}) {
		padding: 0 15px;
	}
`;
