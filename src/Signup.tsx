import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [invalidInput, setInvalidInput] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		try {
			const response = await axios
				.post('http://localhost:3000/api/register', {
					firstName,
					lastName,
					email,
					password,
				})
				.then(res => res);
			if (response.status === 200) {
				localStorage.setItem('token', response.data);
				setFirstName('');
				setLastName('');
				setEmail('');
				setPassword('');
				navigate('/map');
			}
		} catch (error: any) {
			console.log(error);
			if (error.response.status === 400) {
				setInvalidInput(error.response.data.message);
			}
		}
	};

	return (
		<div className="signup-form">
			<form onSubmit={handleSubmit}>
				<h3>Sign Up</h3>
				<label>
					First Name:
					<input
						type="text"
						required
						value={firstName}
						onChange={e => {
							setFirstName(e.target.value);
						}}
					/>
				</label>
				<br />
				<label>
					Last Name:
					<input
						required
						type="text"
						value={lastName}
						onChange={e => {
							setLastName(e.target.value);
						}}
					/>
				</label>
				<br />
				<label>
					Email:
					<input
						required
						type="email"
						value={email}
						onChange={e => {
							setEmail(e.target.value);
						}}
					/>
				</label>
				<br />
				<label>
					Password:
					<input
						required
						type="password"
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
				</label>
				<br />
				<p>{invalidInput}</p>
				<button type="submit">Register</button>
			</form>
			<p>
				Already register? <a href="./login">Log in</a>
			</p>
		</div>
	);
};
