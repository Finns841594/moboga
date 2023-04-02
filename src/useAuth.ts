import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendHost = import.meta.env.VITE_BE_HOST;

type UserInfo = {
	userId: string;
	email: string;
	name: string;
	lastName: string;
	picture?: string;
};

function useAuth() {
	const navigate = useNavigate();
	const [authenticated, setAuthenticated] = useState(false);
	const [invalidInput, setInvalidInput] = useState('');
	const [user, setUser] = useState<UserInfo>();

	const login = async (email: string, password: string) => {
		try {
			const res = await axios.post(backendHost + 'api/login', {
				email,
				password,
			});
			localStorage.setItem('token', res.data);
			setAuthenticated(true);
			navigate('/');
			console.log('LOG IN SUCCESSFULLY!!!! 🥳');
		} catch (error: any) {
			console.error(error.response.data);
			setInvalidInput(error.response.data.message);
		}
	};

	const signInWithGoogle = async (credential: string) => {
		try {
			const res = await axios.post(backendHost + 'api/login-google', {
				credential,
			});
			localStorage.setItem('token', res.data);
			setAuthenticated(true);
			navigate('/');
			console.log('LOG IN SUCCESSFULLY!!!! 🥳');
		} catch (error: any) {
			console.error(error.response.data);
			setInvalidInput(error.response.data.message);
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		setAuthenticated(false);
		navigate('/register');
	};

	const signUp = async (
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) => {
		try {
			const response = await axios
				.post(backendHost + 'api/users', {
					firstName,
					lastName,
					email,
					password,
				})
				.then(res => res);
			if (response.status === 200) {
				localStorage.setItem('token', response.data);
				setAuthenticated(true);
				navigate('/');
				console.log('REGISTER SUCCESSFULLY!!!! 🥳');
			} else {
				console.log('error while register');
			}
		} catch (error: any) {
			console.log(error.response);
			setInvalidInput(error.response.data.message);
		}
	};
	const signUpWithGoogle = async (credential: string) => {
		console.log('here before backend call', credential);
		try {
			const response = await axios
				.post(backendHost + 'api/google-users', {
					credential,
				})
				.then(res => res);
			if (response.status === 201) {
				localStorage.setItem('token', response.data);
				setAuthenticated(true);
				navigate('/');
				console.log('REGISTER SUCCESSFULLY!!!! 🥳');
			} else {
				console.log('error while register');
			}
		} catch (error: any) {
			console.log(error.response);
			setInvalidInput(error.response.data.message);
		}
	};

	const isAuthenticated = () => {
		const token = localStorage.getItem('token');
		axios
			.get(backendHost + 'api/users', {
				headers: {
					Authorization: `token ${token}`,
				},
			})
			.then(res => {
				setUser(res.data);
			})
			.catch(error => {
				console.error('', error);
			});
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
		user,
		setInvalidInput,
		setAuthenticated,
		signUpWithGoogle,
		signInWithGoogle,
	};
}

export default useAuth;
