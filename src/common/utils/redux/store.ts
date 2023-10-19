

import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
	Persistor,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import rootReducer from './combineReducer';
import logger from 'redux-logger'

// persist configuration

const persistConfig = {
  key:'root',
  storage,
}

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }}).concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
});


// Create the Redux Persistor
export const persistor: Persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;