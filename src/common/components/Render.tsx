
import { isEmpty } from 'lodash';
import { IState, IUser } from '../utils/hooks/type';
import RenderIf from './RenderIf';
import React from 'react';
import CircularWithValueLabel from './Loader';
import { Box } from '@mui/material';
import { useGlobalStatus } from '../utils/hooks/global.state';

type IProps={
  state:IState,
  data:IUser[],
  children?:React.ReactNode
}

const UserRender = ({ state, data, children }: IProps) => {

	const [validState] = useGlobalStatus();
	return (
		<div className='bg-wrapper'>
			<RenderIf value={state === 'fetching'}>
				<Box component='div' className='wrapper'>
					<Box component='div'>
						<Box component='div'>
							<CircularWithValueLabel label={0}  />
						</Box>
					</Box>
				</Box>
			</RenderIf>
			<RenderIf value={state === 'loading'}>
				<Box component='div' className='wrapper'>
					<Box component='div'>
						<CircularWithValueLabel variant='indeterminate' label='Loading' />
					</Box>
				</Box>
			</RenderIf>
			<RenderIf value={state === 'success' && !isEmpty(data)}>{children}</RenderIf>
			<RenderIf value={validState === 'success' && state !== 'success' && !isEmpty(data)}>{children}</RenderIf>
			<RenderIf value={state === 'error'}>
				<div className='wrapper'>
					<p className='text-lg text-error'>Error occurred while fetching data.</p>
				</div>
			</RenderIf>
		</div>
	);
};

const MemoizedUserRender = React.memo(UserRender);

export default MemoizedUserRender;