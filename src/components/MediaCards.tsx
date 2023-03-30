import MediaCard from './MediaCard';
import { MediaInStory } from '../types';
import './MediaCards.css';

interface IMediaCardsProp {
	medias: MediaInStory[];
}

const MediaCards = ({ medias }: IMediaCardsProp) => {
	return (
		<div className="media__cards-area">
			{medias.map(media => (
				<MediaCard mediaOid={media.oid} />
			))}
		</div>
	);
};

export default MediaCards;
