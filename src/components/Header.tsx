import { useEffect } from 'react';
import useAuth from '../useAuth';

export const Header = () => {
	const { authenticated, logout, isAuthenticated, user } = useAuth();
	useEffect(() => {
		isAuthenticated();
	}, []);
	return (
		<>
			<div className="header">
				<h1 className="header-title">
					<a href="/">Moboga</a>
				</h1>

				{authenticated ? (
					<div className="header-username">
						<h3 className="header-login-username">Hi, {user?.name}!</h3>
						<a onClick={() => logout()}>Log out</a>
					</div>
				) : (
					<div className="header-username">
						<a href="/register">Register/Login</a>
					</div>
				)}
			</div>
		</>
	);
};
