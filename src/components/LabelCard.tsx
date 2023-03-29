import { useState } from 'react';

export const LabelCard = () => {
	const color = '#1DA1F2';
	const [isOpen, setIsOpen] = useState(false);
	const handleToggle = () => setIsOpen(!isOpen);

	return (
		<>
			<div className="media-card" style={{ backgroundColor: color }}>
				<div className="media-card-header" onClick={handleToggle}>
					<h2 style={{ color: 'white' }} onClick={handleToggle}>
						post-apocalyptic
					</h2>
				</div>
				<div>
					{isOpen ? (
						<ul className={`media-card-list ${isOpen ? 'open' : ''}`}>
							<li className="media-card-item">
								<a href={`./map/2`}>The Last Of Us</a>
							</li>
							<li className="media-card-item">
								<a href={`./map/4`}>Resident Evil</a>
							</li>
							<li className="media-card-item">
								<a href={`./map/3`}>Mad Max</a>
							</li>
						</ul>
					) : null}
				</div>
			</div>
		</>
	);
};
