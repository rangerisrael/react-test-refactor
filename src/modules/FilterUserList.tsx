import { Box, FormControl, Input, InputLabel } from '@mui/material';
import React, {useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../common/utils/redux/hooks';
import {  resetToOriginalState, searchUsers } from '../common/utils/redux/userSlice';
import { isEmpty } from 'lodash';
import { useDebounce } from '../common/utils/hooks/useDebouse';
import { RootState } from '../common/utils/redux/store';
import { getPreviousRecord } from '../common/utils/redux/searchHistorySlice';

const FilterUser = () => {

const dispatch = useAppDispatch();

const inputRef = useRef<HTMLInputElement>(null)

const users = useAppSelector((state: RootState) => state.users);
const history = useAppSelector((state: RootState) => state.history);


useEffect(()=>{
	if (isEmpty(history)) {
		dispatch(getPreviousRecord(users));
	}
},[dispatch, history, users])


const handlerSearchEvent = useDebounce((e: React.ChangeEvent<HTMLInputElement>) => {


	const value = e.target.value;
	

	if (!isEmpty(value)) {

		const findUser = dispatch(searchUsers(e.target.value));


		console.log(findUser);
		// setReset(true);
	} else {
		dispatch(resetToOriginalState(history));
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
}, 200);







  
  return (
		<Box sx={{ display: 'flex', justifyContent: 'end', padding: '1rem' }}>
			<FormControl>
				<InputLabel htmlFor='my-input'>Search term</InputLabel>
				<Input
					ref={inputRef}
					type='search'
					onChange={handlerSearchEvent}
					id='my-input'
					aria-describedby='my-helper-text'
				/>
			</FormControl>
		</Box>
	);
}

export default FilterUser
