import { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from './useAuth';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, invalidInput } = useAuth();

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		login(email, password);
	};

	return (
		<div className="signup-form">
			<form onSubmit={handleSubmit}>
				<h3>Log In</h3>
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
				{invalidInput && <p>{invalidInput}</p>}
				<button type="submit">Login</button>
			</form>
			<p>
				If you don't have an account <Link to={'/register'}>Register here</Link>
			</p>
		</div>
	);
};
