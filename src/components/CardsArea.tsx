import { useState, useEffect } from 'react';
import { LabelCardObj, StoryObj } from '../types';
import { LabelCard } from './LabelCard';

const backendHost = import.meta.env.VITE_BE_HOST;

export const CardsArea = () => {

	const [stories, setStories] = useState<StoryObj[]>();

	const getStories = () => {
		const result = fetch(backendHost + `api/stories`).then(res =>
			res.json()
		);
		return result;
	};

	useEffect(() => {
		getStories().then(results => setStories(results));
	}, []);

	const labelList = ['post-apocalyptic', 'adventure', 'magic', 'science-fiction', 'superhero'];

	let labelCardObjs:LabelCardObj[] = []
	if (stories && stories.length > 0) {
		labelCardObjs = []
		labelList.forEach(labelHere => {
			const labeledStory = stories.filter(story => story.labels.some(label => label.name === labelHere))
			labelCardObjs.push({
				backgroundColor: '#242424',
				textColor: 'white',
				labelName: labelHere, 
				stories: labeledStory}) 
		})
		console.log(labelCardObjs)
	}

	return (
		<>
			<h2>Or explore a story?</h2>
			<div className="cards-area">
				{ labelCardObjs.length > 0 ? (
					labelCardObjs.map(labelCardObj => <LabelCard cardInfo={labelCardObj}/>)
				) : null}
			</div>
		</>
	);
};
