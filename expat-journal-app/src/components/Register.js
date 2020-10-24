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
import logo from '../assets/expatLogLogo.svg';
import axiosWithAuth from '../utils/axiosWithAuth';

const registerSchema = yup.object().shape({
	// need to validate that username hasn't been used before
	username: yup.string().required('Username is required'),
	password: yup.string().required('Password is required'),
	email: yup
		.string()
		.email('Email must be formatted correctly')
		.required('Email is required'),
});

// 🎒 Initial Values
const initRegisterFormValues = {
	username: '',
	password: '',
	email: '',
};
const initRegisterFormErrors = {
	username: '',
	password: '',
	email: '',
};
const initDisabledSubmitButton = true;

export default function Register() {
	const classes = useStyles();
	// 🎒 State
	const [registerFormValues, setRegisterFormValues] = useState(
		initRegisterFormValues
	);
	const [registerFormErrors, setRegisterFormErrors] = useState(
		initRegisterFormErrors
	);
	const [disabledSubmitButton, setDisabledSubmitButton] = useState(
		initDisabledSubmitButton
	);

	// 🎒 Runs every time form changes
	const onChange = (evt) => {
		const { name, value } = evt.target;
		// uncomment if checkboxes are in form, add checked and type to line above
		// const valueToUse = type === "checkbox" ? checked : value;
		yup
			.reach(registerSchema, name)
			.validate(value)
			.then(() => {
				setRegisterFormErrors({
					...registerFormErrors,
					[name]: '',
				});
			})
			.catch((err) => {
				console.log('error', err);
				setRegisterFormErrors({
					...registerFormErrors,
					[name]: err.errors[0],
				});
			});
		setRegisterFormValues({
			...registerFormValues,
			[name]: value,
		});
	};

	// 🎒 Runs every time form is submitted
	const submitRegisterForm = (evt) => {
		evt.preventDefault();
		const newUser = {
			username: registerFormValues.username,
			password: registerFormValues.password,
			email: registerFormValues.email,
		};
		console.log('New User', newUser);

		axiosWithAuth()
			.post('/signup', newUser)
			.then((res) => {
				setRegisterFormValues(initRegisterFormValues);
			})
			.catch((err) => {
				console.dir(err);
			});
	};

	useEffect(() => {
		registerSchema.isValid(registerFormValues).then((valid) => {
			setDisabledSubmitButton(!valid);
		});
	}, [registerFormValues]);

	return (
		<>
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
						<h2>Sign up to see posts from your friends.</h2>
						<form className={classes.form} onSubmit={submitRegisterForm}>
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
								value={registerFormValues.username}
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
								value={registerFormValues.password}
							/>
							<TextField
								className={classes.formSection}
								InputProps={{ className: classes.input }}
								InputLabelProps={{ className: classes.inputLabel }}
								id='email'
								label='Email'
								name='email'
								type='email'
								variant='outlined'
								onChange={onChange}
								value={registerFormValues.email}
							/>

							{/* 🎒 VALIDATION ERRORS */}
							<div className={classes.errors}>
								<div>{registerFormErrors.username}</div>
								<div>{registerFormErrors.password}</div>
								<div>{registerFormErrors.email}</div>
							</div>

							<Button
								disabled={disabledSubmitButton}
								variant='contained'
								className={`${classes.formSection} ${classes.submitBtn}`}
								type='submit'
							>
								Register
							</Button>
						</form>
						<p className={classes.disclaimer}>
							By signing up, you agree to our Terms, which we have not created
							yet.
						</p>
					</CardContent>
				</Card>
				<Card className={classes.card}>
					<p>
						Have an account?{' '}
						<Link to='/' className={classes.loginLink}>
							Log In
						</Link>
					</p>
				</Card>
			</Container>
		</>
	);
}
