import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { Color } from '../../theme';
import useMediaBreakpoint from '../utils/hooks/useBreakpoint';

type FabProps = {
	children: React.ReactNode;
} & React.ComponentProps<typeof Box>;

export default function FloatingActionButtons({ children,...props }: FabProps) {

	const {xl} = useMediaBreakpoint();


	return (
		<Box {...props}>
			<Fab
				sx={{
					background: Color.priWhite,
					color: Color.priBlue,
					'&:hover': {
						background: Color.priBlue,
						color: Color.priWhite,
					},
					position:'fixed',
					right: xl ? 400 : 100,
					bottom:80
				}}
				aria-label='add'
			>
				{children}
			</Fab>
		</Box>
	);
}
