import { useParams } from 'react-router-dom';
import MediaCardsMovies from './MediaCardsMovies';
import Labels from './Labels';

export const DetailsOfMovies = ({ story }: any) => {
	const params = useParams();

	return (
		<>
			<span className="details-main-button-title">
				<button className="specialbtn">Movies</button>
				<h1>{story.storyname}</h1>
			</span>
			<span className="details-buttons-container">
				<a href={'../books/' + params.id} className="bn5">
					<p className="p">Books</p>
				</a>
				<a href={'../games/' + params.id} className="bn5">
					<p className="p">Games</p>
				</a>
			</span>
			<Labels labels={story.labels} />
			<MediaCardsMovies medias={story['movies']} />
		</>
	);
};
