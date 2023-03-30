import { MediaInStory } from '../types';
import './MediaCards.css';
import MediaCardGames from './MediaCardGames';

interface IMediaCardsProp {
	medias: MediaInStory[];
}

const MediaCardsGames = ({ medias }: IMediaCardsProp) => {
	return (
		<>
			<div className="media__cards-area">
				{medias.map(media => (
					<MediaCardGames mediaOid={media.oid} />
				))}
			</div>
		</>
	);
};

export default MediaCardsGames;
