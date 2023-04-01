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
			<SearchArea stories={stories} />
			<CardsArea stories={stories} />
			<Footer />
		</>
	);
};

export default Home;
