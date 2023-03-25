import { SyntheticEvent, useState } from 'react';
import axios from 'axios';

export const Signup = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		axios
			.post('http://localhost:3000/api/register', {
				firstName,
				lastName,
				email,
				password,
			})
			.then(res => console.log(res.data));
		setFirstName('');
		setLastName('');
		setEmail('');
		setPassword('');
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
				<button type="submit">Register</button>
			</form>
			<p>
				Already register? <a href="./login">Log in</a>
			</p>
		</div>
	);
};
