import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import Labels from './components/Labels';
import MediaCardsBooks from './components/MediaCardsBooks';
import MediaCardsMovies from './components/MediaCardsMovies';
import MediaCardsGames from './components/MediaCardsGames';
import ReviewsArea from './components/ReviewsArea';
import { StoryObj } from './types';
import { HeaderDetailMovie } from './components/HeaderDetailMovie';

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
		{params.media === 'movies' ? (<HeaderDetailMovie />):<Header />}
			
			{story ? (
				<>
					<h1>{story.storyname}</h1>
					<Labels initialLabels={story.labels} storyId={story.id} />
				</>
			) : null}
			{story && params.media ? (
				params.media === 'movies' ? (
					<>
						<MediaCardsMovies medias={story['movies']} />
					</>
				) : params.media === 'books' ? (
					<>
						<MediaCardsBooks medias={story['books']} />
					</>
				) : (
					<>
						<MediaCardsGames medias={story['games']} />
					</>
				)
			) : null}
			{story && <ReviewsArea story={story} />}
			<Footer />
		</>
	);
};

export default Details;
