import { useEffect, useState } from 'react';
import useAuth from '../useAuth'
import { useParams } from 'react-router-dom';
import Dropdown from '../assets/dropdown-2.svg';

export const HeaderDetailMovie = () => {
	const params = useParams();

	const { authenticated, logout, isAuthenticated, user } = useAuth();
	const [divDrop, setDivDrop] = useState(false);
	useEffect(() => {
		isAuthenticated();
	}, []);
	return (
		<>
			<div className="header">
				<h1 className="header-title">
					<span><a>Movies</a><a href={"../books/" + params.id} style={{color:'#eaeaea'}}>/bo</a><a href={"../games/" + params.id} style={{color:'#eaeaea'}}>/ga</a></span>
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
