import { createBrowserRouter } from 'react-router-dom';
import UserList from '../modules/UserList';
import Profile from '../modules/Profile';

import '../common/styles/UserList.css';
import MainApp from '../modules';
import ErrorPage from '../common/components/ErrorPage';


const PublicRoute = createBrowserRouter([
	{
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <MainApp />,
			},
			{
				path: '/user-list',
				element: <UserList />,
			},
			{
				path: '/profile/:userId',
				element: <Profile />,
			},
		],
	},
]);


export default PublicRoute;
