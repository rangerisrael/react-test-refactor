import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../hooks/type'; 


// exclude some type not needed
export type PayloadUsers = Omit<IUser, 'updatedDate' | 'properties'>;

const initialState: IUser[] = [];


// Create a user slice
const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<IUser[]>) => {
			return [...action.payload, ...state]; // Create a new array with the updated users
		},

		editUser: (state, action: PayloadAction<{ id: string; updatedUser: IUser }>) => {
			const { id, updatedUser } = action.payload;
			const userIndex = state.findIndex((user) => user.id === id);
			if (userIndex !== -1) {
				state[userIndex] = { ...state[userIndex], ...updatedUser };
			}
		},
		deleteUser: (state, action: PayloadAction<string>) => {
			const userId = action.payload;
			return state.filter((user) => user.id !== userId);
		},
		searchUsers: (state, action: PayloadAction<string>) => {
			const searchTerm = action.payload.toLowerCase();
			return state.filter((user) => {
				// Customize this condition to match only email and name properties
				const { email, firstName, lastName } = user;
				return email.toLowerCase().includes(searchTerm) || firstName.toLowerCase().includes(searchTerm) || lastName.toLowerCase().includes(searchTerm);
			});
		},
		resetToOriginalState: (_state, action: PayloadAction<IUser[]>) => {
			return action.payload; 
		},
	},
});

// Export actions
export const { addUser, editUser, deleteUser, searchUsers, resetToOriginalState } = userSlice.actions;

// Export reducer
export default userSlice.reducer;