import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../hooks/type';

// exclude some type not needed
export type PayloadUsers = Omit<IUser, 'updatedDate' | 'properties'>;

const initialState: IUser[] = [];

// Create a user slice
const searchHistory = createSlice({
	name: 'temp-user',
	initialState,
	reducers: {
		getPreviousRecord: (_state, action: PayloadAction<IUser[]>) => {
			return action.payload; // Create a new array with the updated users
		},
	},
});

// Export actions
export const { getPreviousRecord } = searchHistory.actions;

// Export reducer
export default searchHistory.reducer;
