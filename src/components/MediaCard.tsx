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
	console.log(media?.released);

	useEffect(() => {
		getStories().then(results => setMedia(results));
	}, []);

	return (
		<div className="media__card">
			{media ? (
				<>
					<h3 className="media__card__title">{media.name}</h3>
					<img src={media.imgurl} className="img" />
					{media.released ? (
						<p>Released date: {media.released}</p>
					) : (
						<p>no released date yet</p>
					)}
					{media.description === 'to be written' ? null : (
						<p className="media__card__description">{media.description}</p>
					)}
				</>
			) : null}
		</div>
	);
};

export default MediaCard;
