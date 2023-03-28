import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MediaObj } from '../types';

interface IMediaCardProp {
	mediaOid: string;
}

const MediaCard = ({ mediaOid }: IMediaCardProp) => {
	const [media, setMedia] = useState<MediaObj>();

	const getStories = () => {
		const result = fetch(`http://localhost:3000/api/medias/${mediaOid}`).then(
			res => res.json()
		);
		return result;
	};

	useEffect(() => {
		getStories().then(results => setMedia(results));
	}, []);

	return (
		<div className="media__card">
			{media ? (
				<>
					<h3>{media.name}</h3>
					<img src={media.imgurl} className="img" />
					{ media.description==='to be written' ? null:(<p>{media.description}</p>)}
				</>
			) : null}
		</div>
	);
};

export default MediaCard;
