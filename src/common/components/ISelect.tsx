/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Typography, FormControl, Input as _Input, FormHelperText, Select, MenuItem } from '@mui/material';

import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';




import { isEmpty } from 'lodash';
import { Color } from '../../theme';


type FormProps = {
	name: string;
	label?: string;
	defaultValue?:string;
	children?: React.ReactNode;
	inputOverrideStyle?: React.CSSProperties;
	items: string[];
};


const SelectInputForm = ({ name, label,defaultValue, items }:FormProps) => {
	const {
		control,
		resetField,
		setValue,
		setError,
		formState: { errors },
	} = useFormContext();

	
	const handleChange = (event: any) => {
		// setSelectedValue(event.target.value);
		setValue(name, event.target.value);
		setError(name, { type: 'focus' }, { shouldFocus: false });
	};

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={defaultValue ?? ''}
			render={({ field }) => (
				<FormControl fullWidth>
					<Typography
						variant='body2'
						sx={{
							mb: '8px',
							height: '24px',
							fontSize: '14px',
							fontWeight: ' 600',
							lineHeight: 1.71,
							letterSpacing: '-0.5x',
							color: Color.lightBlack,
						}}
					>
						{label}
					</Typography>

					<Select
						{...field}
						sx={{
							border: errors[name] && errors[name]?.message ? `1px solid ${Color.negative}` : '1px solid #eaeaea',
							'.MuiOutlinedInput-notchedOutline': { border: 0 },
						}}
						onChange={handleChange}
						error={!!errors[name]}
						renderValue={() => {
							if (isEmpty(field.value)) {
								return <em>Select</em>;
							}
							return field.value;
						}}
						MenuProps={{
							PaperProps: { sx: { maxHeight: 250, width: 320 } },
						}}
					>
						{items.map((item, index) => (
							<MenuItem key={index} value={item}>
								{item}
							</MenuItem>
						))}
					</Select>

					<FormHelperText sx={{ margin: 0, mt: 0 }} error={!!errors[name]}>
						<span>{errors[name] && errors[name]?.message !== ('Expected string, received function' as never) ? (errors[name]?.message as never) : ''}</span>
					</FormHelperText>
				</FormControl>
			)}
		/>
	);
};

const SelectForm = React.memo(SelectInputForm);

export default SelectForm;
