import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { useEditActive, useGlobalModal } from '../utils/hooks/global.state';
import FloatingActionButtons from './Fab';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../utils/redux/hooks';
import { addTempUser, initialState } from '../utils/redux/tempuserSlice';


export default function FormDialog({ children,reset }: { children: React.ReactNode; reset: UseFormReset<FieldValues> }) {
	const [open, setOpen] = useGlobalModal();

	const [, setEditable] = useEditActive();
	const dispatch = useAppDispatch();

	const handleClickOpen = () => {
		setOpen(true);
				reset({
					id: '',
					picture: '',
					title: '',
					email: '',
					dateOfBirth: '',
					firstName: '',
					gender: '',
					lastName: '',
					location: {
						city: '',
					},
					phone: '',
					registerDate: '',
				});
	};

	const handleClose = () => {
		setOpen(false);
		setEditable(false);
		dispatch(
			addTempUser({
				id: '',
				picture: '',
				title: '',
				email: '',
				dateOfBirth: '',
				firstName: '',
				gender: '',
				lastName: '',
				location: {
					city: '',
				},
				phone: '',
				registerDate: '',
				updatedDate: '',
				properties: {}
			}),
		);
	};

	return (
		<div>
			<FloatingActionButtons onClick={handleClickOpen}>
				<AddIcon />
			</FloatingActionButtons>

			<Dialog sx={{ maxHeight: '650px', overflowY: 'auto' }} open={open} onClose={handleClose}>
				{children}
			</Dialog>
		</div>
	);
}
