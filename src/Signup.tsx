import { SyntheticEvent, useState } from 'react';
import useAuth from './useAuth';

export const Signup = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signUp, invalidInput } = useAuth();

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		signUp(firstName, lastName, email, password);
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
				{invalidInput && <p>{invalidInput}</p>}
				<button type="submit">Register</button>
			</form>
			<p>
				Already register? <a href="./login">Log in</a>
			</p>
		</div>
	);
};
