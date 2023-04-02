import { useState } from 'react';
import { LabelCardObj } from '../types';

interface ILabelCardProp {cardInfo: LabelCardObj}

export const LabelCard = ({cardInfo}:ILabelCardProp) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleToggle = () => setIsOpen(!isOpen);

	// capitalise the first letter of the label name
	const capitalise = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};


	console.log('👀 backgournd image:', cardInfo.backgroundImage)
	return (
		<>
			<div className="media-card" style={{ backgroundImage: `url(${cardInfo.backgroundImage})`, backgroundSize: 'cover' }} >
				<div className="media-card-header" onClick={handleToggle}>
					<h2 style={{ color: cardInfo.textColor }} onClick={handleToggle}>
						{capitalise(cardInfo.labelName)}
					</h2>
				</div>
				<div>
					{isOpen ? (
						<ul
							className={`media-card-list ${isOpen ? 'open' : ''}`}>
              {cardInfo.stories.length > 0 ? (
                cardInfo.stories.map(story => <li className="media-card-item"><a href={`/map/${story.id}`}>{story.storyname}</a></li>)
              ):null}
						</ul>
					) : null}
				</div>
			</div>
		</>
	);
};

// style={{ backgroundColor: cardInfo.backgroundColor }}