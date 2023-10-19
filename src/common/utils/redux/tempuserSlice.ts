import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../hooks/type';

// exclude some type not needed
export type PayloadUsers = Omit<IUser, 'updatedDate' | 'properties'>;

const initialState: IUser = [];

// Create a user slice
const tempUserSlice = createSlice({
	name: 'temp-user',
	initialState,
	reducers: {
		addTempUser: (_state, action: PayloadAction<IUser>) => {
			return action.payload;
		},
	},
});

// Export actions
export const { addTempUser } = tempUserSlice.actions;

// Export reducer
export default tempUserSlice.reducer;
