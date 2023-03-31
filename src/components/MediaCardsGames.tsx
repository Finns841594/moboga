import { MediaInStory } from '../types';
import './MediaCards.css';
import MediaCardGame from './MediaCardGame';

interface IMediaCardsProp {
	medias: MediaInStory[];
}

const MediaCardsGames = ({ medias }: IMediaCardsProp) => {
	return (
		<>
			<div className="media__cards-area">
				{medias.map(media => (
					<MediaCardGame key={media.oid} mediaOid={media.oid} />
				))}
			</div>
		</>
	);
};

export default MediaCardsGames;
