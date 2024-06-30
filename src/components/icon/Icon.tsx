import iconsSprite from '../../assets/images/icons-sprite.svg';
import { FC } from 'react';

type IconPropsType = {
	iconId: string;
	width?: string;
	height?: string;
	viewBox?: string;
};
export const Icon: FC<IconPropsType> = ({ width, height, viewBox, iconId, ...props }) => {
	return (
		<svg
			width={width || '50'}
			height={height || '50'}
			viewBox={viewBox || '0 0 105 100'}
			xmlns='http://www.w3.org/2000/svg'
		>
			<use xlinkHref={`${iconsSprite}#${iconId}`} />
		</svg>
	);
};
