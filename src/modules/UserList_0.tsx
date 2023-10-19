import React, { useCallback, useEffect, useRef } from 'react';
import RenderIf from "../common/components/RenderIf";
import useDummyApiHandler from "../common/utils/hooks/useDummyApiHandler";
import { isEmpty } from 'lodash';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import MuiNavigation from "../common/components/Appbar";
import FormDialog from "../common/components/MuiDialog";
import { useGlobalModal, useGlobalStatus, useEditActive } from '../common/utils/hooks/global.state';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { RegisterSchemaType, registerSchema } from "../common/utils/schema/register-user.schema";
import IFormInput from "../common/components/IForm";
import SelectForm from '../common/components/ISelect';
import MemoizedUserRender from '../common/components/Render';
import { useAppDispatch, useAppSelector } from '../common/utils/redux/hooks';
import { PayloadUsers, addUser, editUser } from '../common/utils/redux/userSlice';
import { RootState } from '../common/utils/redux/store';
import moment from 'moment';
import MuiTable from '../common/components/MuiTable';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../common/utils/hooks/type';
import { addTempUser } from '../common/utils/redux/tempuserSlice';
import useMediaBreakpoint from '../common/utils/hooks/useBreakpoint';

const UserList = () => {
	const { state, users } = useDummyApiHandler('user', true);

	const data = useAppSelector((state: RootState) => state.users);
	const tempUser = useAppSelector((state: RootState) => state.tempUser);

	const [, setState] = useGlobalStatus();
	const [, setOpen] = useGlobalModal();
	const [editable] = useEditActive();

	const dispatch = useAppDispatch();

	// Generate a Version 4 UUID

	

	const _registerMethods = useForm<RegisterSchemaType>({
		resolver: yupResolver(registerSchema),
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: tempUser,
	});

	const { handleSubmit, reset, setValue,getValues } = _registerMethods;

	const getRows = !isEmpty(data) ? data : users;

	// const users = useAppSelector((state: RootState) => state.users);

	const ref = useRef<boolean>(false);

	useEffect(() => {
		async function cloneUsers() {
			ref.current = true;
			if (isEmpty(data)) {
				dispatch(addUser(users));
			}
		}
		cloneUsers();

		return () => (ref.current = false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

// this is iportant thing for multiple value of states when set value is emit

 useEffect(() => {
		reset(tempUser);
 }, [reset, tempUser]);




	const id: string = uuidv4();

	const onRegisterSubmitHandler: SubmitHandler<RegisterSchemaType> = async (formData) => {
		setValue('id', id);

		if (isEmpty(data)) {
			const insertyMany: IUser[] = [formData, ...(Array.isArray(getRows) ? getRows : [])];
			dispatch(addUser(insertyMany));
		} else {
			if (!isEmpty(tempUser.id)) {
				const tempId = tempUser.id;

				const getUser = data.find((item: { id: string }) => item.id === tempId);

				if (!isEmpty(getUser)) {
					dispatch(editUser({ id: tempId, updatedUser: formData }));

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
							properties: {},
						}),
					);
				}
			} else {
				const insertOne: IUser[] = [formData];
				dispatch(addUser(insertOne));
			}
		}

		setOpen(false);
		setState('success');
	};


	console.log(getValues())


	const {xl} = useMediaBreakpoint();

	return (
		<div>
			<RenderIf value={state === 'success' && !isEmpty(users)}>
				<MuiNavigation />
			</RenderIf>
			<input type='hidden' data-testid='getStatus' value={state} />
			<input type='hidden' data-testid='getUserList' value={users.length} />

			<MemoizedUserRender state={state} data={users}>
				<Box sx={{ paddingTop: xl ? '3rem' : '0' }} className='wrapper-success'>
					{/* <MemoizedTableRows data={users} head={header} href='true' propertyKeys={propertyKeysToShow} /> */}
					<MuiTable data={getRows} customColumn={[]} />
					<FormDialog reset={reset}>
						<FormProvider {..._registerMethods}>
							<DialogTitle>
								<Typography sx={{ fontWeight: 700, fontSize: '1.5rem' }} align='center'>
									{editable === true ? 'Update Form' : 'Register Form'}
								</Typography>
							</DialogTitle>
							<DialogContent>
								<Box noValidate component={'form'} onSubmit={handleSubmit(onRegisterSubmitHandler)}>
									<IFormInput name={'firstName'} label='First Name' />
									<IFormInput name={'lastName'} label='Last Name' />
									<IFormInput name={'email'} label='Email' />
									<IFormInput name={'phone'} label='Phone' />
									<SelectForm label='Gender' name={'gender'} items={['male', 'female', 'transgender']}  />
									<IFormInput name={'location.city'} label='Location' />
									<IFormInput name={'picture'} label='Photo URL' />
									<IFormInput type='date' name={'dateOfBirth'} label='Birth Date' />
									<IFormInput sx={{ display: 'none' }} type='hidden' name={'registerDate'} label='' value={new Date()} />
									<SelectForm label='Title' name={'title'} items={['mr', 'miss', 'mrs2', 'ms']}  />

									<DialogActions>
										<Button sx={{ m: 2 }} type='submit' variant='contained'>
											SAVE
										</Button>
									</DialogActions>
								</Box>
							</DialogContent>
						</FormProvider>
					</FormDialog>
				</Box>
			</MemoizedUserRender>

			<RenderIf value={state === 'error'}>
				<div className='wrapper'>
					<p className='text-lg text-error'>Error occurred while fetching data.</p>
				</div>
			</RenderIf>
		</div>
	);
}

export default UserList
