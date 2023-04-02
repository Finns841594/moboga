import { useParams } from 'react-router-dom';
import Labels from './Labels';
import MediaCardsGames from './MediaCardsGames';

export const DetailsOfGames = ({ story }: any) => {
	const params = useParams();

	return (
		<>
			<span className="details-main-button-title">
				<button className="specialbtn">Games</button>
				<h1>{story.storyname}</h1>
			</span>
			<span className="details-buttons-container">
				<a href={'../books/' + params.id} className="bn5">
					<p className="p">Books</p>
				</a>
				<a href={'../movies/' + params.id} className="bn5">
					<p className="p">Movies</p>
				</a>
			</span>
			<Labels labels={story.labels} />
			<MediaCardsGames medias={story['games']} />
		</>
	);
};
