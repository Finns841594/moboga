import { MediaInStory } from '../types';
import './MediaCards.css';
import MediaCardMovie from './MediaCardMovie';

interface IMediaCardsProp {
	medias: MediaInStory[];
}

const MediaCardsMovies = ({ medias }: IMediaCardsProp) => {
	return (
		<>
			<div className="media__cards-area">
				{medias.map(media => (
					<MediaCardMovie key={media.oid} mediaOid={media.oid} />
				))}
			</div>
		</>
	);
};

export default MediaCardsMovies;
