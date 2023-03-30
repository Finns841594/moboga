import { useState } from 'react';
import { LabelCardObj } from '../types';

interface ILabelCardProp {cardInfo: LabelCardObj}

export const LabelCard = ({cardInfo}:ILabelCardProp) => {
	const color = '#1DA1F2';
	const [isOpen, setIsOpen] = useState(false);
	const handleToggle = () => setIsOpen(!isOpen);

	return (
		<>
			<div className="media-card" style={{ backgroundColor: cardInfo.backgroundColor }}>
				<div className="media-card-header" onClick={handleToggle}>
					<h2 style={{ color: cardInfo.textColor }} onClick={handleToggle}>
						{cardInfo.labelName}
					</h2>
				</div>
				<div>
					{isOpen ? (
						<ul className={`media-card-list ${isOpen ? 'open' : ''}`}>
							{/* <li className="media-card-item">
								<a href={`./map/2`}>The Last Of Us</a>
							</li>
							<li className="media-card-item">
								<a href={`./map/4`}>Resident Evil</a>
							</li>
							<li className="media-card-item">
								<a href={`./map/3`}>Mad Max</a>
							</li> */}
              {cardInfo.stories.length > 0 ? (
                cardInfo.stories.map(story => <li className="media-card-item"><a href={`./map/${story.id}`}>{story.storyname}</a></li>)
              ):null}
						</ul>
					) : null}
				</div>
			</div>
		</>
	);
};
