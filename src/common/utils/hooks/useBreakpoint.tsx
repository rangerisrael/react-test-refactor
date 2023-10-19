import { Theme, useMediaQuery } from '@mui/material';

const useMediaBreakpoint = () => {
	const xs = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
	const xs320 = useMediaQuery((theme: Theme) => theme.breakpoints.down(321));
	const sm = useMediaQuery((theme: Theme) => theme.breakpoints.only('sm'));
	const md = useMediaQuery((theme: Theme) => theme.breakpoints.only('md'));
	const lg = useMediaQuery((theme: Theme) => theme.breakpoints.only('lg'));
	const xl = useMediaQuery((theme: Theme) => theme.breakpoints.only('xl'));

	const mdLg = useMediaQuery((theme: { breakpoints: { up: (args1: string, arg2: string) => string } }) => theme?.breakpoints?.up('md', 'lg'));

	return { xs320, xs, sm, mdLg, md, lg,xl };
};
export default useMediaBreakpoint;
