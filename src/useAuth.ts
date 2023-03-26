import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function useAuth() {
	const navigate = useNavigate();
	const [authenticated, setAuthenticated] = useState(false);
	const [invalidInput, setInvalidInput] = useState('');

	const login = async (email: string, password: string) => {
		try {
			const res = await axios.post('http://localhost:3000/api/login', {
				email,
				password,
			});
			localStorage.setItem('token', res.data);
			// localStorage.setItem('userId', )
			setAuthenticated(true);
			navigate('/map');
			console.log('LOG IN SUCCESSFULLY!!!! 🥳');
		} catch (error: any) {
			console.error(error.response.data);
			setInvalidInput(error.response.data.message);
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		setAuthenticated(false);
		navigate('/login');
	};

	const signUp = async (
		firstName: string,
		lastName: string,
		email: any,
		password: any
	) => {
		try {
			const response = await axios
				.post('http://localhost:3000/api/users', {
					firstName,
					lastName,
					email,
					password,
				})
				.then(res => res);
			localStorage.setItem('token', response.data);
			setAuthenticated(true);
			navigate(-1);
			console.log('REGISTER SUCCESSFULLY!!!! 🥳');
		} catch (error: any) {
			console.log(error.response);
			setInvalidInput(error.response.data.message);
		}
	};

	const isAuthenticated = () => {
		const token = localStorage.getItem('token');
		if (token) {
			setAuthenticated(true);
		} else {
			setAuthenticated(false);
		}
	};

	return {
		authenticated,
		login,
		logout,
		isAuthenticated,
		invalidInput,
		signUp,
	};
}

export default useAuth;
