import { useEffect, useState } from 'react';
import useAuth from '../useAuth';
import MenuBar from '../assets/menu-bar.svg';
import { Dropdown } from './Dropdown';

export const Header = () => {
	const { authenticated, logout, isAuthenticated, user } = useAuth();
	const [divDrop, setDivDrop] = useState(false);
	console.log(user?.picture, 'HERE PHOTO');
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
							<div className="picture-container">
								<a onClick={() => setDivDrop(!divDrop)}>
									{user?.picture ? (
										<img className="profile-picture" src={user?.picture}></img>
									) : (
										<img className="dropdown-icon" src={MenuBar} />
									)}
								</a>
								{divDrop && <Dropdown />}
							</div>
						</span>
					</div>
				) : (
					<div className="header-username">
						<a href="/register">Register</a>/<a href="/login">Login</a>
					</div>
				)}
			</div>
		</>
	);
};
