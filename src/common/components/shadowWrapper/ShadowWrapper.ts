import styled from 'styled-components';

export const ShadowWrapper = styled.div`
	border-radius: 7px;
	height: min-content;
	box-shadow:
		0 2px 4px rgba(0, 255, 255, 0.12),
		0 2px 3px rgba(0, 255, 255, 0.24);
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	text-align: center;

	&:hover {
		box-shadow:
			0 14px 28px rgba(0, 255, 255, 0.25),
			0 10px 10px rgba(0, 255, 255, 0.22);
	}
`;
