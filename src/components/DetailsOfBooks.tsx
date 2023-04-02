import { useParams } from 'react-router-dom';
import MediaCardsBooks from './MediaCardsBooks';
import Labels from './Labels';

export const DetailsOfBooks = ({ story }: any) => {
	const params = useParams();

	return (
		<>
			<span className="details-main-button-title">
				<button className="specialbtn">Books</button>
				<h1>{story.storyname}</h1>
			</span>
			<span className="details-buttons-container">
				<a href={'../movies/' + params.id} className="bn5">
					<p className="p">Movies</p>
				</a>
				<a href={'../games/' + params.id} className="bn5">
					<p className="p">Games</p>
				</a>
			</span>
			<Labels labels={story.labels} />
			<MediaCardsBooks medias={story['books']} />
		</>
	);
};
