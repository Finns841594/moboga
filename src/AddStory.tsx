import { useState } from 'react';
import { StoryObj } from './types';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import MediaCardsBooks from './components/MediaCardsBooks';
import MediaCardsGames from './components/MediaCardsGames';
import MediaCardsMovies from './components/MediaCardsMovies';
import { SearchToAddStory } from './components/SearchToAddStory';
import ReactLoading from 'react-loading';
import './AddStory.css';

const backendHost = import.meta.env.VITE_BE_HOST;

const AddStory = () => {
	const [story, setStory] = useState<StoryObj>();
	const [showLoading, setShowLoading] = useState(false);

	const getStories = (storyId: string) => {
		const result = fetch(backendHost + `api/stories/${storyId}`).then(res =>
			res.json()
		);
		console.log('🤪🤪🤪 Get the story:', result);
		return result;
	};

  const generateStory = (storyName: string) => {
    const story = fetch(backendHost + `api/stories/` + storyName, {method: 'POST'})
      .then(res => res.json())
      .then(results => {
        console.log('🤪 results:', results)
        return results.ops[0]}) as Promise<StoryObj>;
    return story;
  }


	const generateMedias = (storyName: string) => {
		const response = fetch(backendHost + `api/generatemedias/` + storyName, {
			method: 'POST',
		}).then(res => res.json());
		console.log('🎦🎦🎦 generated medias:', response);
		return response;
	};

	const handleSearch = async (searchTerm: string) => {
		setShowLoading(true);
		generateStory(searchTerm)
			.then(story => {
				if (story) {
					console.log('✅ Generated Story:', story);
					return generateMedias(story.storyname);
				} else {
					console.log('❌ Generated Story failed');
					return getStories(searchTerm);
				}
			})
			.then(res => {
				console.log('✅ Generated Meidas:', res);
				return getStories(res.responseGames.addedToStoryWithId);
			})
			.then(story => {
				console.log('🤪🤪🤪 story:', story);
				setStory(story);
				setShowLoading(false);
			});
	};

	const deleteAStory = (storyId: string) => {
		const url = backendHost + `api/stories/${storyId}`;
		const response = fetch(url, { method: 'DELETE' }).then(res => res.json());
		console.log('🎦🎦🎦 deleted story:', response);
		return response;
	};

	const deleteStoryHandler = () => {
		if (story) {
			deleteAStory(story?.id);
			setStory(undefined);
		}
	};

	return (
		<>
			<Header />
			<SearchToAddStory onSearch={handleSearch} />
				<div className='addstory'>
					{showLoading ? (
						<ReactLoading
							type={'spokes'}
							color={'white'}
							height={'40px'}
							width={'40px'}
							className="loading"
						/>
					) : (
						<>
							{story &&
								(story.movies.length > 0 ? (
									<>
										<div className="addstory-container">
											<h1 className="addstory-subtitle">
												Help us check the story: {story.storyname}
											</h1>

											<h1 className="addstory-subtitle">Movies found:</h1>
											<MediaCardsMovies medias={story['movies']} />
											<h1 className="addstory-subtitle">Books found:</h1>
											<MediaCardsBooks medias={story['books']} />
											<h1 className="addstory-subtitle">Games found:</h1>
											<MediaCardsGames medias={story['games']} />
											<div>
												<a href={`/details/movies/${story.id}`}>
													<button className="addstory-buttons">Save Story</button>
												</a>
												<button
													className="addstory-buttons"
													onClick={deleteStoryHandler}
												>
													Cancel
												</button>
											</div>
										</div>
									</>
								) : (
									<h4>Sorry not story found</h4>
								))}
						</>
					)}
				</div>
			<Footer />
		</>
	);
};

export default AddStory;
