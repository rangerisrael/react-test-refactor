import { List, ListItemButton, ListItemText } from '@mui/material';
import React from 'react'

type Link = {
	href:string,
	label:string
}

type INavigationProps = {
	items: Link[];
};


const INavigation: React.FunctionComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & INavigationProps>  = ({items}) => {
  return (
		<List sx={{ display:'flex'}}>	
			{items.map((item, i) => (
				<ListItemButton key={i} component='a' href={item.href}>
					<ListItemText primary={item.label} />
				</ListItemButton>
			))}
		</List>
	);
}

export default INavigation;
