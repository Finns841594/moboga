import { useEffect } from 'react';
import useAuth from '../useAuth';

export const Header = () => {
	const { authenticated, logout, isAuthenticated } = useAuth();
	useEffect(() => {
		isAuthenticated();
	}, []);
	return (
		<>
			<h1>Moboga!</h1>
			<nav>
				{authenticated ? (
					<button onClick={() => logout()}>Log out</button>
				) : (
					<button>
						<a href="/login">Register/Login</a>
					</button>
				)}
			</nav>
		</>
	);
};
