import { useEffect, useState } from 'react';
import { CardsArea } from './components/CardsArea';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SearchArea } from './components/SearchArea';
import { StoryObj } from './types';
import { getStories } from './api';

const Home = () => {
	const [stories, setStories] = useState<StoryObj[]>([] as StoryObj[]);

	useEffect(() => {
		getStories().then(results => setStories(results));
	}, []);
	return (
		<>
			<Header />
			<div className='home-container' >
				<SearchArea stories={stories} />
				<CardsArea stories={stories} />
				<div style={{ marginTop: '20px' }}>
					<h2>
						Didn't find your story? <br />
						<a href="/addstory">Create it!</a>
					</h2>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Home;
