
import { combineReducers } from 'redux'
import tempUserReducer from './tempuserSlice'
import usersReducer from './userSlice'
import searchHistoryReducer from './searchHistorySlice'

const rootReducer = combineReducers({
	users: usersReducer,
	tempUser: tempUserReducer,
	history: searchHistoryReducer,
});

export default rootReducer;