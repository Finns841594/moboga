import { useRef } from 'react';
import useAuth from '../useAuth';

export const Dropdown = () => {
	const { logout } = useAuth();

	return (
		<div>
			<div className="dropdown-menu">
				<ul className="dropdown-list">
					<a href="/">
						<li className="dropdown-item">Home</li>
					</a>
					<a href="/profile">
						<li className="dropdown-item">My profile</li>
					</a>
					<a>
						<li className="dropdown-item">About</li>
					</a>
					<a onClick={() => logout()}>
						<li className="dropdown-item">Log out</li>
					</a>
				</ul>
			</div>
		</div>
	);
};
