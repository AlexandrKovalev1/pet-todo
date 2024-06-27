import styled from 'styled-components';
import bg from '../../assets/images/404.jpg';

type Props = {};
export const ErrorPage = (props: Props) => {
	return (
		<StyledWrapper>
			<img src={bg} alt="" />
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
& img {
    width: 100%;
}
`;