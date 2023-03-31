import { MediaInStory } from '../types';
import './MediaCards.css';
import MediaCardBook from './MediaCardBook';

interface IMediaCardsProp {
	medias: MediaInStory[];
}

const MediaCardsBooks = ({ medias }: IMediaCardsProp) => {
	return (
		<>
			<div className="media__cards-area">
				{medias.map(media => (
					<MediaCardBook key={media.oid} mediaOid={media.oid} />
				))}
			</div>
		</>
	);
};

export default MediaCardsBooks;
