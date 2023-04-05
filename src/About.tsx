import { Footer } from './components/Footer';
import { Header } from './components/Header';
import GithubLogo from './assets/github-mark-white.svg';
import FengHead from './assets/IMG_2639 cropped.png';
import MarHead from './assets/DSC00772.png';
import LinkedInLogo from './assets/LI-Logo.png';
import MapImg from './assets/MAP.png';
import DetailsImg from './assets/DetailsHP.png';
import HomeImg from './assets/Screenshot 2023-04-05 at 15.06.58 (2).png';

import './About.css';

export const About = () => {
	return (
		<>
			<Header />
			<div className="about-container">
				<section>
					<h2>About the project:</h2>
					<div className="about-project__content">
						<p style={{ width: '80%' }}>
							MoboGa is a platform that showcases the interconnectedness between
							movies, books, and game adaptations of stories for fans. Here, you
							can delve into alternate dimensions of your favorite stories. For
							instance, if you're an avid reader and viewer of the Harry Potter
							series, you may also enjoy exploring the world of Harry Potter
							video games.
						</p>
						<img style={{ width: '80%' }} src={HomeImg}></img>
						<p style={{ width: '80%' }}>
							Discover stories similar to your favorites with our interactive
							Story Map. This feature visualizes the many-to-many relationships
							between stories and their genres (or Labels), to help you find
							your next adventure.
						</p>
						<img style={{ width: '80%' }} src={MapImg}></img>
						<p style={{ width: '80%' }}>
							We invite you to join our community! Once registered or logged in
							via Google, you can share your thoughts in a review, vote on
							stories to help refine the relationship between Labels and
							narratives, or even contribute your own story to our growing
							collection.
						</p>
						<img style={{ width: '80%' }} src={DetailsImg}></img>
					</div>
					<h3>Contacts</h3>
					<div className="about__contact-area">
						<div className="about__contact-info">
							<h4>Mariana Molina</h4>
							<img className="img-profile" src={MarHead} />
							<p>Software developer</p>
							<p>marsmolina20@gmail.com</p>
							<span>
								<a href="https://www.linkedin.com/in/marianasoledadmolina/?locale=en_US">
									<img className="linkedinLogo" src={LinkedInLogo}></img>
								</a>
								<a href="https://github.com/mariana-molina">
									<img style={{ height: '40px' }} src={GithubLogo}></img>
								</a>
							</span>
						</div>
						<div className="about__contact-info">
							<h4>Feng Yang</h4>
							<img className="img-profile" src={FengHead}></img>
							<p>Software developer</p>
							<p>fengy142857@gmail.com</p>
							<span>
								<a href="https://www.linkedin.com/in/feng-yang-511361166/">
									<img className="linkedinLogo" src={LinkedInLogo}></img>
								</a>
								<a href="https://github.com/Finns841594">
									<img style={{ height: '40px' }} src={GithubLogo}></img>
								</a>
							</span>
						</div>
					</div>
					<h3>Build with</h3>
					<div></div>
				</section>
				<section>
					<h2>Usage:</h2>
					<div></div>
				</section>
				<div>
					<h2>Acknoledgments:</h2>
					<div>instrtuctors</div>
					<div>external apis</div>
				</div>
			</div>
			<Footer />
		</>
	);
};
