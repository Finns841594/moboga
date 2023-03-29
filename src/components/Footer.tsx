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
				<p>Contributers:</p>
				<div className="git-hub__container">
					<a href="https://github.com/Finns841594">
						<img className="github-logo" src={GithubLogo} />
					</a>
					<a href="https://github.com/mariana-molina">
						<img className="github-logo" src={GithubLogo} />
					</a>
				</div>
				<span className="github-text-container">
					<p className="github-text__item">Feng</p>
					<p className="github-text__item">Mariana</p>
				</span>
			</div>
		</>
	);
};
