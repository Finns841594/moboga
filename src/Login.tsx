import { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from './useAuth';
import './Signup.css';
import { Header } from './components/Header';
import { GoogleLogin } from '@react-oauth/google';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, invalidInput, setInvalidInput, signInWithGoogle } = useAuth();

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		login(email, password);
	};

	return (
		<>
			<Header />
			<h3 className="signup-form__title">Login</h3>
			<div className="signup-form-login">
				<form onSubmit={handleSubmit}>
					<div className="signup-form__container">
						<label className="signup-form__label">
							Email:
							<input
								className="signup-form__input"
								required
								type="email"
								value={email}
								onChange={e => {
									setEmail(e.target.value);
								}}
								onFocus={e => {
									setInvalidInput('');
								}}
							/>
						</label>
						<br />

						<label className="signup-form__label">
							Password:
							<input
								className="signup-form__input"
								required
								type="password"
								value={password}
								onChange={e => {
									setPassword(e.target.value);
								}}
								onFocus={e => {
									setInvalidInput('');
								}}
							/>
						</label>
						<br />
					</div>
					{invalidInput && <p className="invalid-input">{invalidInput}</p>}
					<br />
					<button type="submit">Login</button>
				</form>
				<div className="google-form">
					<h4 className="signup-form__subtitle">Login with Google</h4>
					<GoogleLogin
						text="continue_with"
						onSuccess={(credentialResponse: any) => {
							signInWithGoogle(credentialResponse.credential);
						}}
						onError={() => {
							console.log('Login Failed');
						}}
					/>
				</div>
			</div>
			<p className="already-register">
				If you don't have an account
				<Link to={'/register'}> Register here</Link>
			</p>
		</>
	);
};
