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
	const backgroundImage = [
		'https://i.pinimg.com/736x/05/c6/90/05c690180c7bbc7b836ce7ad5099f333.jpg',
		'https://media.wired.com/photos/633c95ef85e7a4cc2f802256/master/w_2560%2Cc_limit/Breath-of-the-Wild-Casual-Gamer-Culture.jpg',
		'https://hips.hearstapps.com/hmg-prod/images/mv5bmtg4oda3mjyym15bml5banbnxkftztcwmtuxodcwngatat-v1-sx1663-cr0-0-1663-999-al-1589923290.jpg',
		'https://m.media-amazon.com/images/I/81GG9szllnL.jpg',
		'https://www.komar.de/en/media/catalog/product/cache/5/image/9df78eab33525d08d6e5fb8d27136e95/4/-/4-4124_avengers_movie_poster_web.jpg',
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
				backgroundImage: backgroundImage[labelList.indexOf(labelHere)],
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
