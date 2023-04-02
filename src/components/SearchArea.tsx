import { useEffect, useRef, useState } from 'react';
import { StoryObj } from '../types';
import { useNavigate } from 'react-router-dom';
import './SearchArea.css';

type SearchAreaProps = { stories: StoryObj[] };

export const SearchArea = ({ stories }: SearchAreaProps) => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState('');
	const [storyOptionsList, setStoryOptionsList] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);

	//Create an array of all the story names
	const options: any = [];
	const addStoriesToOptions = (stories: StoryObj[]) => {
		stories.forEach(story => {
			options.push(story.storyname);
		});
	};
	addStoriesToOptions(stories);

	const searchingStories = (event: any) => {
		const input = event.target.value;
		setSearchTerm(input);

		// Filter options that start with the input and set the filtered list to storyOptionsList
		setStoryOptionsList(
			options.filter((option: any) =>
				option.toLowerCase().startsWith(input.toLowerCase())
			)
		);
		// Reset the selected index when the search term changes
		setSelectedIndex(-1);
	};

	const selectStoryOption = (option: any) => {
		const movieId = stories.find(story => story.storyname === option)?.id;
		navigate(`/map/${movieId}`);
		setSearchTerm('');
		setStoryOptionsList([]);
		setSelectedIndex(-1);
	};
	const handleKeyDown = (event: any) => {
		if (event.key === 'ArrowUp' && selectedIndex > 0) {
			// Move up the list
			setSelectedIndex(selectedIndex - 1);
		} else if (
			event.key === 'ArrowDown' &&
			selectedIndex < storyOptionsList.length - 1
		) {
			// Move down the list
			setSelectedIndex(selectedIndex + 1);
		} else if (event.key === 'Enter' && selectedIndex >= 0) {
			selectStoryOption(storyOptionsList[selectedIndex]);
		}
	};
	useEffect(() => {
		if (storyOptionsList.length > 0) {
			inputRef.current && inputRef.current.focus();
		}
	}, [storyOptionsList]);

	return (
		<section className="search-area">
			<h2>Find a story</h2>
			<div className="search_bar">
				<input
					className="search__input"
					type="text"
					value={searchTerm}
					placeholder="Search for a story"
					onFocus={() => setStoryOptionsList(options)}
					onBlur={() =>
						setTimeout(() => {
							setStoryOptionsList([]);
						}, 200)
					}
					onChange={searchingStories}
					onKeyDown={handleKeyDown}
					ref={inputRef}
				/>
				<ul className="search__list">
					{storyOptionsList.map((story, index) => (
						<li
							key={story}
							onClick={() => selectStoryOption(story)}
							className={
								selectedIndex === index
									? 'search__list-item selected'
									: 'search__list-item'
							}
						>
							{story}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};
