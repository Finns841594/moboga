import './Footer.css';
import GithubLogo from '../assets/github-mark-white.svg';
export const Footer = () => {
	return (
		<>
			<div className="footer-container">
				<p className="footer-text">
					© 2023 Moboga by Amber. All rights reserved.
				</p>
				<p className="footer-text">
					Moboga is a mobile application designed and developed by the Amber.
				</p>
				<p className="footer-text">
					Data provided by the Google Books API, the MovieDB API and Rawg API.
				</p>
				<p>Founders:</p>
				<div className="github__container">
					<span className="github-profile-container">
						<a href="https://github.com/Finns841594">
							<img className="github-logo" src={GithubLogo} />
						</a>
						<p className="">Feng</p>
						<a href="https://www.linkedin.com/in/feng-yang-511361166/">LinkedIn</a>
					</span>
					<span className="github-profile-container">
						<a href="https://github.com/mariana-molina">
							<img className="github-logo" src={GithubLogo} />
						</a>
						<p className="">Mariana</p>
						<a href="https://www.linkedin.com/in/marianasoledadmolina">LinkedIn</a>
					</span>
				</div>
			</div>
		</>
	);
};
