import { SyntheticEvent, useState } from 'react';
import useAuth from './useAuth';
import './Signup.css';
import { Header } from './components/Header';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
// import { useGoogleLogin } from '@react-oauth/google';

export const Signup = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signUp, invalidInput, setInvalidInput, signUpWithGoogle } = useAuth();

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		signUp(firstName, lastName, email, password);
	};

	// const login = useGoogleLogin({
	// 	onSuccess: (tokenResponse: any) =>
	// 		signUpWithGoogle(tokenResponse.access_token),
	// });

	return (
		<>
			{/* <GoogleLogin
							text="continue_with"
							onSuccess={(credentialResponse) => {
								console.log(credentialResponse);
							}}
							onError={() => {
								console.log('Login Failed');
							}}
						/> */}
			{/* <button className="google-bton" onClick={() => login()}>
					<img
						className="google-icon"
						src="../src/assets/search.png"
						alt="google-icon"
					/>
					Sign up with Google
				</button> */}
			<Header />
			<h3 className="signup-form__title">Sign Up</h3>
			<div className="signup-form">
				<form onSubmit={handleSubmit}>
					<h4 className="signup-form__subtitle">Create a new account:</h4>
					<div className="signup-form__container">
						<label className="signup-form__label">
							First Name:
							<input
								className="signup-form__input"
								type="text"
								required
								value={firstName}
								onChange={e => {
									setFirstName(e.target.value);
								}}
								onFocus={e => {
									setInvalidInput('');
								}}
							/>
						</label>
						<br />
						<label className="signup-form__label">
							Last Name:
							<input
								className="signup-form__input"
								required
								type="text"
								value={lastName}
								onChange={e => {
									setLastName(e.target.value);
								}}
								onFocus={e => {
									setInvalidInput('');
								}}
							/>
						</label>
						<br />
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
					<button type="submit">Register</button>
				</form>
				<div className="google-form">
					<h4 className="signup-form__subtitle">Or Register with Google</h4>
					<GoogleLogin
						text="signin_with"
						onSuccess={(credentialResponse: any) => {
							signUpWithGoogle(credentialResponse.credential);
						}}
						onError={() => {
							console.log('Login Failed');
						}}
					/>
				</div>
			</div>
			<p className="already-register">
				Already register? <a href="./login">Log in</a>
			</p>
		</>
	);
};
