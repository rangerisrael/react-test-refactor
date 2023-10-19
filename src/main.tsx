import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import PublicRoute from './router';
import { Provider } from 'react-redux';
import store, { persistor } from './common/utils/redux/store';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { CssBaseline } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';
import MuiNavigation from './common/components/Appbar';


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading='null' persistor={persistor}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<MuiNavigation/>
					<RouterProvider router={PublicRoute} />
				</ThemeProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
);
