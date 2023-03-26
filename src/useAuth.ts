import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function useAuth() {
	const navigate = useNavigate();
	const [authenticated, setAuthenticated] = useState(false);
	const [invalidInput, setInvalidInput] = useState('');

	const login = async (email: any, password: any) => {
		try {
			const res = await axios.post('http://localhost:3000/api/login', {
				email,
				password,
			});
			localStorage.setItem('token', res.data);
			setAuthenticated(true);
			navigate('/map');
			console.log('LOG IN SUCCESSFULLY!!!! 🥳');
		} catch (err: any) {
			console.error(err.response.data);
			setInvalidInput(err.response.data.message);
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		setAuthenticated(false);
		navigate('/login');
	};

	const isAuthenticated = () => {
		const token = localStorage.getItem('token');
		if (token) {
			setAuthenticated(true);
		} else {
			setAuthenticated(false);
		}
	};

	return { authenticated, login, logout, isAuthenticated, invalidInput };
}

export default useAuth;
