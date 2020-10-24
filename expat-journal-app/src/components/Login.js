import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Card,
	CardContent,
	CardMedia,
	TextField,
	Button,
} from '@material-ui/core';
import useStyles from '../styles/formStyle';

import * as yup from 'yup';
import schema from '../validation/login_schema';
import axiosWithAuth from '../utils/axiosWithAuth';
import logo from '../assets/expatLogLogo.svg';

const initialFormValues = {
	username: '',
	password: '',
};
const initialFormErrors = {
	username: '',
	password: '',
};

const initialDisabled = true;

function Login() {
	const classes = useStyles();

	const [formValues, setFormValues] = useState(initialFormValues);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [disabled, setDisabled] = useState(initialDisabled);

	const formSubmit = () => {
		axiosWithAuth()
			.post('/login', formValues)
			.then((res) => {
				console.log(res);
				console.log('login successful!');

				localStorage.setItem('token', res.data.token);

				window.location = '/posts';
			})
			.catch((err) => {
				console.log(err);
				console.log('login failed');
			});
	};

	const onSubmit = (evt) => {
		evt.preventDefault();
		formSubmit();
	};

	const onChange = (evt) => {
		const { name, value } = evt.target;
		inputChange(name, value);
	};

	const inputChange = (name, value) => {
		yup
			.reach(schema, name)
			.validate(value)
			.then(() => {
				setFormErrors({
					...formErrors,
					[name]: '',
				});
			})
			.catch((err) => {
				console.log(err);
				setFormErrors({
					...formErrors,
					[name]: err.errors[0],
				});
			});
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	useEffect(() => {
		schema.isValid(formValues).then((valid) => {
			setDisabled(!valid);
		});
	}, [formValues]);

	return (
		<Container className={classes.container}>
			<Card className={classes.card}>
				<CardMedia
					src={logo}
					component='img'
					className={classes.logo}
					// image={require('../assets/expatLogoCircle.png')}
					title='The Expat Log'
				/>
				<CardContent className={classes.cardContent}>
					<form className={classes.form} onSubmit={onSubmit}>
						<TextField
							className={classes.formSection}
							InputProps={{ className: classes.input }}
							InputLabelProps={{ className: classes.inputLabel }}
							id='username'
							label='Username'
							name='username'
							type='text'
							variant='outlined'
							onChange={onChange}
							value={formValues.username}
						/>
						<TextField
							className={classes.formSection}
							InputProps={{ className: classes.input }}
							InputLabelProps={{ className: classes.inputLabel }}
							id='password'
							label='Password'
							name='password'
							type='password'
							variant='outlined'
							onChange={onChange}
							value={formValues.password}
						/>
						<div className={classes.errors}>
							<div>{formErrors.username}</div>
							<div>{formErrors.password}</div>
						</div>
						<Button
							className={`${classes.formSection} ${classes.submitBtn}`}
							disabled={disabled}
							variant='contained'
							type='submit'
						>
							Login
						</Button>
					</form>
				</CardContent>
			</Card>
			<Card className={classes.card}>
				<p>
					Don't have an account?{' '}
					<Link to='/register' className={classes.loginLink}>
						Sign Up
					</Link>
				</p>
			</Card>
		</Container>
	);
}

export default Login;
