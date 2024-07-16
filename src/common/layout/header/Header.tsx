import React, { FC } from 'react';
import styled from 'styled-components';
import { authThunks, selectIsAuth } from 'features/login/model/authSlice';
import { Icon } from 'common/components/icon/Icon';
import { Container } from 'common/components/container/Container';
import { useAppDispatch, useAppSelector } from 'app/store';
import { ProgressLinear } from 'common/components/ProgressLinear/ProgressLinear';
import { selectLogin } from 'app/appSlice';

type Props = {};
export const Header: FC<Props> = ({ ...rest }) => {
	return (
		<HeaderStyled>
			<Container width={'1440px'}>
				<FlexWrapper>
					<h1>
						<a href='/public'>
							<Icon iconId={'logo'} viewBox={'0 75 250 90'} />
						</a>
					</h1>

					<h2>Welcome to todo list!!!</h2>
					<LogoinBlock />
				</FlexWrapper>
			</Container>
			<ProgressLinear />
		</HeaderStyled>
	);
};

const LogoinBlock = () => {
	const isAuth = useAppSelector(selectIsAuth);
	const login = useAppSelector(selectLogin);
	const dispatch = useAppDispatch();

	const onClickLogoutHandler = () => {
		dispatch(authThunks.logout());
	};

	return isAuth ? (
		<div>
			<span>{`Hello ${login}`}</span>
			<button onClick={onClickLogoutHandler}>Logout</button>
		</div>
	) : (
		<button>Login</button>
	);
};

//styled Components

const HeaderStyled = styled.header`
	position: relative;
	width: 100vw;
	height: 80px;
	background-color: rgba(255, 255, 255, 0.8);
`;

const FlexWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100%;
`;
