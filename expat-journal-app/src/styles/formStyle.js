import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	container: {
		// border: '1px solid red',
		display: 'flex',
		flexFlow: 'column nowrap',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
		backgroundImage:
			"url('https://images.unsplash.com/photo-1534445867742-43195f401b6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80')",
	},
	card: {
		// border: '1px solid red',
		display: 'flex',
		flexDirection: 'column',
		width: '40rem',
		alignItems: 'center',
		marginBottom: '2rem',
		padding: '2rem 0',
		fontSize: '1.6rem',
	},
	logo: {
		width: '10rem',
		margin: '2rem 0 1rem',
	},
	cardContent: {
		display: 'flex',
		flexFlow: 'column nowrap',
		alignItems: 'center',
		justifyContent: 'center',
	},
	form: {
		// border: '1px solid pink',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: '2rem 0 0',
		padding: '0',
	},
	formSection: {
		// border: '1px solid green',
		width: '32rem',
		fontSize: '1.6rem',
		margin: '0 0 1rem',
	},
	input: {
		fontSize: '1.4rem',
	},
	inputLabel: {
		fontSize: '1.4rem',
	},
	errors: {
		color: '#FF0E0A',
		margin: '1rem 0 1.6rem',
	},
	submitBtn: {
		// border: '1px solid green',
		padding: '0.5rem 0',
		textTransform: 'capitalize',
		color: '#ffffff',
		backgroundColor: '#3590F3',
		'&:disabled': {
			color: '#ffffff',
			backgroundColor: '#65ABF6',
		},
		'&:hover': {
			color: '#ffffff',
			backgroundColor: '#3590F3',
		},
	},
	disclaimer: {
		fontSize: '1.2rem',
		textAlign: 'center',
	},
	loginLink: {
		color: '#3590F3',
		textDecoration: 'none',
		fontWeight: '700',
	},
});

export default useStyles;
