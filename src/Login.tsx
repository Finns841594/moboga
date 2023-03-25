import axios from 'axios';
import { SyntheticEvent, useState } from 'react';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		axios
			.post('http://localhost:3000/api/login', {
				email,
				password,
			})
			.then(res => console.log(res.data));
		setEmail('');
		setPassword('');
	};

	return (
		<div className="signup-form">
			<form onSubmit={handleSubmit}>
				<h3>Log In</h3>
				<label>
					Email:
					<input
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
						type="password"
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
				</label>
				<br />

				<button type="submit">Login!</button>
			</form>
		</div>
	);
};
