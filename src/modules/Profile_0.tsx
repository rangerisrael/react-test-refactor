import { Link, useNavigate, useParams } from 'react-router-dom'
import MemoizedTableRows, { PropertyKey } from '../common/components/Table';
import useDummyApiHandler from '../common/utils/hooks/useDummyApiHandler';
import MemoizedUserRender from '../common/components/Render';
import { IUser } from '../common/utils/hooks/type';
import IButton from '../common/components/IButton';
import { useCallback } from 'react';
import RenderIf from '../common/components/RenderIf';
import MuiNavigation from '../common/components/Appbar';
import { isEmpty } from 'lodash';
import MuiTable, { Label } from '../common/components/MuiTable';
import { GridCellParams, GridColDef, GridComparatorFn, GridValueGetterParams, gridStringOrNumberComparator } from '@mui/x-data-grid';
import { Color } from '../theme';
import moment from 'moment';
import { useAppSelector } from '../common/utils/redux/hooks';
import { RootState } from '../common/utils/redux/store';
import { Box } from '@mui/material';


const Profile = () => {

const params = useParams<{ userId: string }>();


	const data = useAppSelector((state: RootState) => state.users);
	


  
const { state, users } = useDummyApiHandler(`user/${params.userId}`, false);
const navigate = useNavigate();

  
// 	const header = ['Name', 'Photo','Location','Email', 'Gender', 'Birtdate','Registered Date', 'Title'];

// const propertyKeysToShow: PropertyKey<Partial<IUser>>[] = [{ key: 'location', nestedKey: 'city' }, 'email', 'gender', 'dateOfBirth', 'registerDate', 'title'];


const onRoute = useCallback(() => {
	navigate('/');
},[navigate])


	 const sortComparator: GridComparatorFn = (v1, v2, param1, param2) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return gridStringOrNumberComparator((v1 as any).name, (v2 as any).name, param1, param2);
		};


 const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Name',
			width: 150,
			valueGetter: (params: GridValueGetterParams) => ({
				name: params.row.firstName,
			}),
			renderCell: (params: GridCellParams) => (
				<Link color={Color.priBlue} href={`profile/${params.row.id}`}>
					<Label customFontStyle={{ fontWeight: 'bold' }} value={`${params.row.firstName} ${params.row.lastName}`} />
				</Link>
			),
			sortComparator: sortComparator,
		},

		{
			field: 'photo',
			headerName: 'Photo',
			width: 80,
			valueGetter: (params: GridValueGetterParams) => ({
				name: params.row.picture,
			}),
			renderCell: (params: GridCellParams) => <img src={params.row.picture} className='img-rounded' />,
			sortComparator: sortComparator,
		},
		{
			field: 'email',
			headerName: 'Email',
			width: 220,
			valueGetter: (params: GridValueGetterParams) => ({
				name: params.row.email,
			}),
			renderCell: (params: GridCellParams) => <Label value={`${params.row.email}`} />,
			sortComparator: sortComparator,
		},
		{
			field: 'phone',
			headerName: 'phone',
			width: 120,
			valueGetter: (params: GridValueGetterParams) => ({
				name: params.row.phone,
			}),
			renderCell: (params: GridCellParams) => <Label value={`${params.row.phone}`} />,
			sortComparator: sortComparator,
		},
		{
			field: 'gender',
			headerName: 'gender',
			width: 80,
			valueGetter: (params: GridValueGetterParams) => ({
				name: params.row.gender,
			}),
			renderCell: (params: GridCellParams) => <Label value={`${params.row.gender}`} />,
			sortComparator: sortComparator,
		},
		{
			field: 'location',
			headerName: 'Location',
			width: 150,
			valueGetter: (params: GridValueGetterParams) => ({
				name: params.row.location.city,
			}),
			renderCell: (params: GridCellParams) => <Label value={`${params.row.location.city}`} />,
			sortComparator: sortComparator,
		},
		{
			field: 'dateOfBirth',
			headerName: 'Birth Date',
			width: 200,
			valueGetter: (params: GridValueGetterParams) => ({
				name: params.row.dateOfBirth,
			}),
			renderCell: (params: GridCellParams) => <Label value={`${moment(params.row.dateOfBirth).format('DD MMM YYYY').toString()}`} />,
			sortComparator: sortComparator,
		},
		{
			field: 'registerDate',
			headerName: 'Register Date',
			width: 150,
			valueGetter: (params: GridValueGetterParams) => ({
				name: params.row.registerDate,
			}),
			renderCell: (params: GridCellParams) => <Label value={`${moment(params.row.registerDate).format('DD MMM YYYY').toString()}`} />,
			sortComparator: sortComparator,
		},
		{
			field: 'title',
			headerName: 'Title',
			width: 50,
			valueGetter: (params: GridValueGetterParams) => ({
				name: params.row.title,
			}),
			renderCell: (params: GridCellParams) => <Label value={`${params.row.title}`} />,
			sortComparator: sortComparator,
		},
 ];

 	const getRows = !isEmpty(data) ? data.filter((list: { id: string | undefined; }) => list.id === params.userId) : users;

	
 if(!isEmpty(data)){
		return (
			<>
				<MuiNavigation />
				<div className='wrapper-success h-resize'>
					<MuiTable data={getRows} customColumn={columns} />
					{/* <MemoizedTableRows data={[users as unknown as IUser]} head={header} clsx='user-tag' isProfile={true} propertyKeys={propertyKeysToShow} /> */}
				</div>
			</>
		);
 }

else{
	  return (
			<div>
				<input type='hidden' name='status' data-testid='getStatus' value={state} />
				<input type='hidden' name='profile' data-testid='getProfile' value={users.length ?? 0} />
				{/* <h1>Profile</h1>*/}

				<RenderIf value={state === 'success' && !isEmpty(users)}>
					<MuiNavigation />
				</RenderIf>
				<IButton variant='outlined' color='primary' label='Back' onClick={onRoute} />

				<MemoizedUserRender state={state} data={getRows}>
					<div className='wrapper-success h-resize'>
						<MuiTable data={getRows} customColumn={columns} />
						{/* <MemoizedTableRows data={[users as unknown as IUser]} head={header} clsx='user-tag' isProfile={true} propertyKeys={propertyKeysToShow} /> */}
					</div>
				</MemoizedUserRender>
			</div>
		);
}



}

export default Profile
