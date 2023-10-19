import { createTheme } from '@mui/material/styles';

const mainColor = '#2752E7';
const whiteSpace = '#ffffff';
const mainText = '#ffffff';

export const Color = {
	line: '#eaeaea',
	positive: '#66d19e',
	negative: '#e11900',
	textHint: '#7e7e7e',
	bgGreyLight: '#f6f6f6',
	priBlue: '#2752e7',
	priWhite: '#ffffff',
	textBlack: '#1d2130',
	priRed: '#ff6a68',
	pureBlack: '#000000',
	lightBlack: '#000',
	bgLine: '#eaeaea',
	textBlue: '#276ef1',
	textLight: '#eeeeee ',
};

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 481,
			md: 769,
			lg: 1281,
			xl: 1441,
		},
	},
	palette: {
		primary: {
			main: Color.priBlue,
			contrastText: Color.priWhite,
		},
		secondary: {
			main: Color.priBlue,
		},
	},
	typography: {
		fontFamily: ['Manrope', 'sans-serif'].join(','),
	},
	components: {
		MuiButtonBase: {
			defaultProps: {
				// The props to change the default for.
				//disableRipple: true, // No more ripple!
			},
		},
		MuiButton: {
			styleOverrides: {
				// text buttons
				text: {
					color: mainText,
				},
				outlined: {
					color: mainText,
				},
				contained: {
					color: mainText,
					fontWeight: 700,
					boxShadow: 'none',
				},
			},
		},
		MuiTextField: {
			variants: [
				{
					props: { variant: 'outlined' },
					style: {
						height: '56px',
						fontSize: '1rem',
						'& .MuiOutlinedInput-root': {
							'& > fieldset': {
								border: `0.5px solid ${Color.priBlue}`,
								borderRadius: '4px',
							},
						},
						'& .MuiOutlinedInput-root:hover': {
							'& > fieldset': {
								border: `0.5px solid ${Color.priBlue}`,
							},
						},
						'& .MuiOutlinedInput-root.Mui-focused': {
							'& > fieldset': {
								borderColor: Color.priBlue,
								borderRadius: '4px',
							},
						},
					},
				},
			],
		},
	
	},
});

export default theme;

// Reference Link
// https://mui.com/customization/theming/
// https://mui.com/components/
// https://mui.com/components/material-icons/?theme=Rounded&query=Gear
