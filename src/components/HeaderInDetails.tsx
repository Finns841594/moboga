import { useEffect, useRef, useState } from 'react';
import useAuth from '../useAuth';
import MenuBar from '../assets/menu-bar.svg';
import { Dropdown } from './Dropdown';
import { useParams } from 'react-router-dom';

export const HeaderInDetails = () => {
	const { authenticated, isAuthenticated, user } = useAuth();
	const [divDrop, setDivDrop] = useState(false);
	const params = useParams();

	useEffect(() => {
		isAuthenticated();
	}, []);

	return (
		<>
			<div className="header">
				<h1 className="header-title">
					<a href="/">Moboga</a>
				</h1>

				<div className='header_navbtns'>
				<a href={'../books/' + params.id} className={params.media === 'movies' ? 'specialbtn' : 'bn5'}>
					<p className="p">Movies</p>
				</a>
				<a href={'../books/' + params.id} className={params.media === 'books' ? 'specialbtn' : 'bn5'}>
					<p className="p">Books</p>
				</a>
				<a href={'../games/' + params.id} className={params.media === 'games' ? 'specialbtn' : 'bn5'}>
					<p className="p">Games</p>
				</a>

				</div>

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
