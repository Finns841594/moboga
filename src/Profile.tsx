import { useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import useAuth from './useAuth';

export const Profile = () => {
	const { authenticated, logout, isAuthenticated, user } = useAuth();
	useEffect(() => {
		isAuthenticated();
	}, []);
	return (
		<>
			{authenticated && (
				<>
					<Header />
					<div className=""></div>
					<Footer />
				</>
			)}
		</>
	);
};
