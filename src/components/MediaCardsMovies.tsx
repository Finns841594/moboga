import { MediaInStory } from '../types';
import './MediaCards.css';
import MediaCardMovies from './MediaCardMovies';

interface IMediaCardsProp {
	medias: MediaInStory[];
}

const MediaCardsMovies = ({ medias }: IMediaCardsProp) => {
	return (
		<>
			<div className="media__cards-area">
				{medias.map(media => (
					<MediaCardMovies mediaOid={media.oid} />
				))}
			</div>
		</>
	);
};

export default MediaCardsMovies;
