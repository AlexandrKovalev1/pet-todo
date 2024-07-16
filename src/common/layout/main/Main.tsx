import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
	children: ReactNode;
};

export const Main: FC<Props> = ({ children, ...rest }) => {
	return <StyledMain>{children}</StyledMain>;
};

const StyledMain = styled.div`
	padding-top: 15px;
	width: 100%;
	height: 100%;
`;
