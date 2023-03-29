import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import Labels from './components/Labels';
import MediaCards from './components/MediaCards';
import ReviewsArea from './components/ReviewsArea';
import { StoryObj } from './types';

const backendHost = import.meta.env.VITE_BE_HOST;

export const Details = () => {
	const params = useParams();

	const [story, setStory] = useState<StoryObj>();

	if (params.id) {
		const getStories = () => {
			const result = fetch(backendHost + `api/stories/${params.id}`).then(res =>
				res.json()
			);
			console.log('🤔🤔🤔🤔🤔', result);
			return result;
		};

		useEffect(() => {
			getStories().then(results => setStory(results));
		}, []);
	}

	return (
		<>
			<Header />
			{story ? (
				<>
					<h1>{story.storyname}</h1>
					<Labels labels={story.labels} />
				</>
			) : null}
			{story && params.media ? (
				params.media === 'movies' ? (
					<>
						<MediaCards medias={story['movies']} />
					</>
				) : params.media === 'books' ? (
					<>
						<MediaCards medias={story['books']} />
					</>
				) : (
					<>
						<MediaCards medias={story['games']} />
					</>
				)
			) : null}
			<ReviewsArea />
			<Footer />
		</>
	);
};

export default Details;
