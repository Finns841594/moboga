import { useEffect } from 'react';
import useAuth from '../useAuth';

export const Header = () => {
	const { authenticated, logout, isAuthenticated, user } = useAuth();
	useEffect(() => {
		isAuthenticated();
	}, []);
	return (
		<>
			<h1>{user?.name} welcome to Moboga</h1>
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
