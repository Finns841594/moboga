import { useState, useEffect } from 'react';
import { MediaObj } from '../types';

const backendHost = import.meta.env.VITE_BE_HOST;

interface IMediaCardProp {
	mediaOid: string;
}

const MediaCard = ({ mediaOid }: IMediaCardProp) => {
	const [media, setMedia] = useState<MediaObj>();

	const getStories = () => {
		const result = fetch(backendHost + `api/medias/${mediaOid}`).then(res =>
			res.json()
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
					{media.description === 'to be written' ? null : (
						<p>{media.description}</p>
					)}
				</>
			) : null}
		</div>
	);
};

export default MediaCard;
