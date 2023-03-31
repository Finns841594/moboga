import { useState, useEffect } from 'react';

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

	const getStories = () => {
		const result = fetch(backendHost + `api/medias/${mediaOid}`).then(res =>
			res.json()
		);
		return result;
	};

	useEffect(() => {
		getStories().then(results => setMovies(results));
	}, []);

	return (
		<div key={mediaOid} className="media__card">
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

export default MediaCardMovie;
