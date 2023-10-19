import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { isEmpty, startCase } from 'lodash';



type LoaderProps = {
	loadingValue: string | number;
	variant: 'indeterminate' | 'determinate';
} & Partial<CircularProgressProps>;

function CircularProgressWithLabel({ loadingValue, variant = 'determinate', ...props }: LoaderProps) {
	return (
		<Box sx={{ position: 'relative', display: 'inline-flex' }}>
			<CircularProgress variant={variant} {...props} size={80} />
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{typeof loadingValue === 'string' ? (
					<Typography sx={{ fontSize: '1rem' }} variant='caption' component='div' color='text.secondary'>
						{startCase(loadingValue)}
					</Typography>
				) : (
					<Typography sx={{ fontSize: '2rem' }} variant='caption' component='div' color='text.secondary'>{`${Math.round(Number(loadingValue))}%`}</Typography>
				)}
			</Box>
		</Box>
	);
}

type LabelProps = {
	label: string | number;
	variant?: LoaderProps['variant'];
};

export default function CircularWithValueLabel({ label, variant = 'determinate' }: LabelProps) {
	const [progress, setProgress] = React.useState(10);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
		}, 800);
		return () => {
			clearInterval(timer);
		};
	}, []);

	const getDefineValue = !isEmpty(label) ? label : progress;

	return <CircularProgressWithLabel loadingValue={getDefineValue} variant={variant} />;
}




