import { useState } from 'react';
import { LabelCardObj } from '../types';

interface ILabelCardProp {
	cardInfo: LabelCardObj;
}

export const LabelCard = ({ cardInfo }: ILabelCardProp) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleToggle = () => setIsOpen(!isOpen);

	const capitalise = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	return (
		<>
			<div
				className="home-label-card"
				style={{
					backgroundImage: `url(${cardInfo.backgroundImage})`,
					backgroundSize: 'cover',
				}}
				onClick={handleToggle}
			>
				<div className="home-label-card-header">
					<h2 style={{ color: cardInfo.textColor }} onClick={handleToggle}>
						{capitalise(cardInfo.labelName)}
					</h2>
				</div>
				<div>
					{isOpen ? (
						<ul className={`home-label-card-list ${isOpen ? 'open' : ''}`}>
							{cardInfo.stories.length > 0
								? cardInfo.stories.map(story => (
										<li className="home-label-card-item">
											<a href={`/map/${story.id}`}>{story.storyname}</a>
										</li>
								  ))
								: null}
						</ul>
					) : null}
				</div>
			</div>
		</>
	);
};

// style={{ backgroundColor: cardInfo.backgroundColor }}
