import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import React from 'react';
import styled from 'styled-components';

type Props = {};
export const Sceleton = (props: Props) => {
	return (
		<SceletonWrapper>
			<Skeleton variant='rectangular' width={'100%'} height={80} animation='wave' />
			<Grid container wrap='nowrap'>
				<Box sx={{ width: '25%', marginRight: 0.5, my: 5 }}>
					<Card
						sx={{
							maxWidth: '100%',
							height: 100,
							m: 2,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-evenly',
						}}
					>
						<Skeleton variant='rounded' width={'90%'} height={30} animation='wave' />
						<Skeleton variant='rounded' width={'40%'} height={30} animation='wave' />
					</Card>
				</Box>
				<Box sx={{ width: '25%', marginRight: 0.5, my: 5 }}></Box>
				<Box sx={{ width: '25%', marginRight: 0.5, my: 5 }}></Box>
			</Grid>
		</SceletonWrapper>
	);
};

export const SceletonWrapper = styled.div`
	height: 100vh;
	background-color: white;
`;
