import { FormControl, Input as _Input, InputProps, Typography, styled } from '@mui/material';
import React from 'react';
import { Color } from '../../theme';
import { Controller, useFormContext } from 'react-hook-form';
import { isEmpty } from 'lodash';

const Input = styled(_Input)`
	background-color: white;
	padding: 0.4rem 0.7rem;
`;

type FormProps = {
	name: string;
	label?: string;
	defaultValue?:string;
	children?: React.ReactNode;
	inputOverrideStyle?:React.CSSProperties
} & InputProps;

const InputForm = ({ name, label,defaultValue, children, disabled, inputOverrideStyle, ...inputProps }: FormProps) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={!isEmpty(defaultValue) ? defaultValue : ''}
			render={({ field }) => (
				<FormControl
					fullWidth
					sx={{
						mb: '8px',
						...inputOverrideStyle,
					}}
				>
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
					<Input
						type={'text'}
						{...field}
						fullWidth
						disableUnderline
						disabled={disabled}
						sx={{
							borderStyle: 'solid',
							borderWidth: '1px',
							height: '44px',
							borderRadius: '4px',
							borderColor: '#eaeaea',
						}}
						error={!!errors[name]}
						{...inputProps}
					/>

					<span
						style={{
							color: Color.negative,
							fontSize: '12px',
							fontWeight: 600,
						}}
					>
						{errors[name] && errors[name]?.message !== ('Expected string, received function' as never) ? (errors[name]?.message as never) : ''}
					</span>

					{children}
				</FormControl>
			)}
		/>
	);
};

const IFormInput = React.memo(InputForm);

export default IFormInput;
