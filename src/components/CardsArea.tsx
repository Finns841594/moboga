import { LabelCardObj, StoryObj } from '../types';
import { LabelCard } from './LabelCard';
type CardsAreaProps = { stories: StoryObj[] };
export const CardsArea = ({ stories }: CardsAreaProps) => {
	const labelList = [
		'post-apocalyptic',
		'adventure',
		'magic',
		'science-fiction',
		'superhero',
	];

	let labelCardObjs: LabelCardObj[] = [];
	if (stories && stories.length > 0) {
		labelCardObjs = [];
		labelList.forEach(labelHere => {
			const labeledStory = stories!.filter(story =>
				story.labels.some(label => label.name === labelHere)
			);
			labelCardObjs.push({
				backgroundColor: '#242424',
				textColor: 'white',
				labelName: labelHere,
				stories: labeledStory,
			});
		});
	}

	return (
		<>
			<h2>Or explore a story?</h2>
			<div className="cards-area">
				{labelCardObjs.length > 0
					? labelCardObjs.map(labelCardObj => (
							<LabelCard key={labelCardObj.labelName} cardInfo={labelCardObj} />
					  ))
					: null}
			</div>
		</>
	);
};
