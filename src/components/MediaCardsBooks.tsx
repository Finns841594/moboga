import { MediaInStory } from '../types';
import './MediaCards.css';
import MediaCardBooks from './MediaCardBooks';

interface IMediaCardsProp {
	medias: MediaInStory[];
}

const MediaCardsBooks = ({ medias }: IMediaCardsProp) => {
	return (
		<>
			<div className="media__cards-area">
				{medias.map(media => (
					<MediaCardBooks mediaOid={media.oid} />
				))}
			</div>
		</>
	);
};

export default MediaCardsBooks;
