import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from './components/Footer';
import ReviewsArea from './components/ReviewsArea';
import { StoryObj } from './types';
import { Header } from './components/Header';
import { DetailsOfMovies } from './components/DetailsOfMovies';
import { DetailsOfBooks } from './components/DetailsOfBooks';
import { DetailsOfGames } from './components/DetailsOfGames';
import './Details.css';

const backendHost = import.meta.env.VITE_BE_HOST;

export const Details = () => {
	const params = useParams();

	const [story, setStory] = useState<StoryObj>();

	if (params.id) {
		const getStories = () => {
			const result = fetch(backendHost + `api/stories/${params.id}`).then(res =>
				res.json()
			);
			return result;
		};

		useEffect(() => {
			getStories().then(results => setStory(results));
		}, []);
	}

	return (
		<>
			<Header />
			{story && params.media === 'movies' ? (
				<DetailsOfMovies story={story} />
			) : story && params.media === 'books' ? (
				<DetailsOfBooks story={story} />
			) : story && params.media === 'games' ? (
				<DetailsOfGames story={story} />
			) : null}
			{story && <ReviewsArea story={story} />}
			<Footer />
		</>
	);
};

export default Details;
