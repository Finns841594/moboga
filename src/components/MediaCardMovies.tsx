import { useState, useEffect } from 'react';
import { MediaObj } from '../types';

const backendHost = import.meta.env.VITE_BE_HOST;

interface IMediaCardProp {
	mediaOid: string;
}

type MoviesObj = {
	id: string;
	name: string;
	description: string;
	released: string;
	imgurl: string;
	ratingFromAPI: number;
	voteNumberFromAPI: number;
	metaData: MovieMetadata;
};

type MovieMetadata = {
	original_language: string;
	overview: string;
	popularity: number;
	release_date: string;
	title: string;
	vote_average: number;
	vote_count: number;
};

const MediaCardMovies = ({ mediaOid }: IMediaCardProp) => {
	const [movies, setMovies] = useState<MoviesObj>();

	const getStories = () => {
		const result = fetch(backendHost + `api/medias/${mediaOid}`).then(res =>
			res.json()
		);
		return result;
	};
	console.log(movies?.released);

	useEffect(() => {
		getStories().then(results => setMovies(results));
	}, []);

	return (
		<div className="media__card">
			{movies ? (
				<>
					<h3 className="media__card__title">{movies.name}</h3>
					<img src={movies.imgurl} className="img" />
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

export default MediaCardMovies;
