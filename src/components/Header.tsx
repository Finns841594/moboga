import { useEffect, useState } from 'react';
import useAuth from '../useAuth';
import Dropdown from '../assets/dropdown-2.svg';

export const Header = () => {
	const { authenticated, logout, isAuthenticated, user } = useAuth();
	const [divDrop, setDivDrop] = useState(false);
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
					<div className="header-user-container">
						<span className="header-username">
							<h3 className="header-login-username">
								Hi, <a href="/profile">{user?.name}</a>!
							</h3>
							<a onClick={() => setDivDrop(!divDrop)}>
								<img className="dropdown-icon" src={Dropdown} />
							</a>
						</span>
						{divDrop && (
							<div className="dropdown-menu">
								<ul className="dropdown-list">
									<a href="/profile">
										<li className="dropdown-item">My profile</li>
									</a>
									<a href="/">
										<li className="dropdown-item">Home</li>
									</a>
									<a>
										<li className="dropdown-item">About</li>
									</a>
									<a onClick={() => logout()}>
										<li className="dropdown-item">Log out</li>
									</a>
								</ul>
							</div>
						)}
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
