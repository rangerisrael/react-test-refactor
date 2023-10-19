import { styled,Stack, Box, Typography, Link  } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridComparatorFn, GridValueGetterParams, gridStringOrNumberComparator } from '@mui/x-data-grid';
import { Color } from '../../theme';
import { isEmpty } from 'lodash';
import { IUser } from '../utils/hooks/type';
import { ComponentProps } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEditActive, useGlobalModal } from '../utils/hooks/global.state';
import { useAppDispatch } from '../utils/redux/hooks';
import {  deleteUser } from '../utils/redux/userSlice';
import { addTempUser } from '../utils/redux/tempuserSlice';
import FilterUser from '../../modules/FilterUserList';
import useMediaBreakpoint from '../utils/hooks/useBreakpoint';
import RenderIf from './RenderIf';
import moment from 'moment';


const DataGridCustomStyles = styled(DataGrid)(() => ({
	'& .MuiDataGrid-columnHeaders': { backgroundColor: 'transparent !important',color:Color.textHint,fontWeight:700},
}));



interface MuiTableRows<T extends IUser> {
	data: T[];
	customColumn: GridColDef[];
}


	export const Label = ({
		value,
		customStyle,
		customFontStyle,
		children,
		...props
	}: {
		value: string;
		customStyle?: React.CSSProperties;
		customFontStyle?: React.CSSProperties;
		children?: React.ReactNode;
	} & ComponentProps<typeof Box>) => {
		return (
			<Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', ...customStyle }} {...props}>
				<Typography sx={{ ...customFontStyle }}>{value}</Typography>
				{children}
			</Box>
		);
	};


// export function getUniqueArray<T>(array: T[], key1: keyof T) {
// 	return array.reduce((uniqueArray, obj) => {
// 		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 		const isDuplicate = uniqueArray.some((uniqueObj: any) => uniqueObj[key1] === obj[key1]);
// 		if (!isDuplicate) {
// 			uniqueArray.push(obj);
// 		}
// 		return uniqueArray;
// 	}, [] as T[]);
// }



const MuiTable = <T extends IUser>({ data, customColumn }: MuiTableRows<T>) => {
	const [, setOpen] = useGlobalModal();
	const [, setEdit] = useEditActive();

	const dispatch = useAppDispatch();

	const { md, lg, xl, sm } = useMediaBreakpoint();

	const sortComparator: GridComparatorFn = (v1, v2, param1, param2) => {
		return gridStringOrNumberComparator((v1 as any).name, (v2 as any).name, param1, param2);
	};

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Name',
			width: 300,
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
			field: 'email',
			headerName: 'Email',
			width: 300,
			valueGetter: (params: GridValueGetterParams) => ({
				name: params.row.email,
			}),
			renderCell: (params: GridCellParams) => <Label value={`${params.row.email}`} />,
			sortComparator: sortComparator,
		},
		{
			field: 'edit',
			headerName: 'Action',
			width: 60,
			valueGetter: (params: GridValueGetterParams) => ({
				name: params.row.id,
			}),
			renderCell: (params: GridCellParams) => (
				<Box
					onClick={() => {
						setEdit(true);
						setOpen(true);

						const dateOfBirth = moment(params.row.dateOfBirth).format('YYYY-MM-DD').toString();

						dispatch(addTempUser({ ...params.row, dateOfBirth: dateOfBirth }));
					}}
				>
					<ModeEditIcon />
				</Box>
			),
			sortComparator: sortComparator,
		},
		{
			field: 'delete',
			headerName: 'Action',
			width: 60,
			valueGetter: (params: GridValueGetterParams) => ({
				name: params.row.id,
			}),
			renderCell: (params: GridCellParams) => (
				<Box
					onClick={() => {
						dispatch(deleteUser(params.row.id));
					}}
				>
					<DeleteIcon />
				</Box>
			),
			sortComparator: sortComparator,
		},
	];

	function NoResultsOverlay() {
		return (
			<Stack height='100%' alignItems='center' justifyContent='center'>
				No results found
			</Stack>
		);
	}

	const getColumns = !isEmpty(customColumn) ? customColumn : columns;

const slotsCondtion = isEmpty(customColumn)
	? {
			noRowsOverlay: NoResultsOverlay,
	  }
	: {
			noRowsOverlay: NoResultsOverlay,
			footer: () => null,
	  }; 

	const DataTable = ({ page }: { page: number }) => {
		return (
			<DataGridCustomStyles
				sortingOrder={['desc', 'asc']}
				autoHeight={!isEmpty(data)}
				rows={data}
				columns={getColumns}
				initialState={{
					...data.initialState,
					pagination: { paginationModel: { pageSize: page } },
					sorting: {
						sortModel: [{ field: 'id', sort: 'desc' }],
					},
				}}
				pageSizeOptions={[5, 10]}
				slots={slotsCondtion}
			/>
		);
	};

	return (
		<Box>
			{isEmpty(customColumn) ? <FilterUser /> : ''}
			<RenderIf value={xl}>
				<Box sx={{ width: 'auto', height: !isEmpty(data) ? '100vh' : '350px', minHeight: '560px', overflowY: 'auto', paddingInline: '3rem', position: 'relative' }}>
					<DataTable page={10} />
				</Box>
			</RenderIf>
			<RenderIf value={lg || md || sm}>
				<Box sx={{ width: 'auto', height: !isEmpty(data) ? '100vh' : '350px', minHeight: '560px', overflowY: 'auto', paddingInline: '3rem', position: 'relative' }}>
					<DataTable page={5} />
				</Box>
			</RenderIf>
		</Box>
	);
};;

export default MuiTable;
