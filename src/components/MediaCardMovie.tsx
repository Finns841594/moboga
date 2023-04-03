import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../useAuth';
import ImageWithButton from './ImageWithButton';

const backendHost = import.meta.env.VITE_BE_HOST;

interface IMediaCardProp {
	mediaOid: string;
}

type MediaObj = {
	id: string;
	name: string;
	description: string;
	released: string;
	imgurl: string;
	ratingFromAPI: number;
	voteNumberFromAPI: number;
};

const MediaCardMovie = ({ mediaOid }: IMediaCardProp) => {
	const [movies, setMovies] = useState<MediaObj>();
	const params = useParams();
	const { isAuthenticated, user } = useAuth();


	const getStories = () => {
		const result = fetch(backendHost + `api/medias/${mediaOid}`).then(res =>
			res.json()
		);
		return result;
	};

	// Delete media from the story
	const deleteHandler= () => {
		console.log('deleting media with oid: ', mediaOid, ' from the story', params.id)
    const url = backendHost + `api/removemedias/${params.id}/` + mediaOid
    const results = fetch(url, {method: 'DELETE'}).then(res => res.json());
		console.log(results)
		return results;
	}

	useEffect(() => {
		getStories().then(results => setMovies(results));
		isAuthenticated();
	}, []);

	return (
		<div key={mediaOid} className="media__card">
			{movies ? (
				<>
					<h3 className="media__card__title">{movies.name}</h3>
					{ user?.userId !== 'Funder F' ? (<img src={movies.imgurl} className="img" />) :
					(<ImageWithButton imageUrl={movies.imgurl} deleteHandler={deleteHandler} />)}
					{movies.released ? (
						<p>
							<strong>Released date:</strong> {movies.released}
						</p>
					) : (
						<p>no released date yet</p>
					)}
					{movies.ratingFromAPI ? (
						<p>
							<strong>Rating:</strong> {movies.ratingFromAPI}
						</p>
					) : (
						<p>no rating available</p>
					)}
					{movies.description ? (
						<p className="media__card__movies">{movies.description}</p>
					) : (
						<p>no description available</p>
					)}
				</>
			) : null}
		</div>
	);
};

export default MediaCardMovie;
