import { platform } from 'os';
import { useState, useEffect } from 'react';

const backendHost = import.meta.env.VITE_BE_HOST;

interface IMediaCardProp {
	mediaOid: string;
}

type GamesObj = {
	id: string;
	name: string;
	description: string;
	released: string;
	imgurl: string;
	ratingFromAPI: number;
	voteNumberFromAPI: number;
	metaData: GamesMetadata;
};

type GamesMetadata = {
	platforms: { platform: { name: string } }[];
};

const MediaCardGame = ({ mediaOid }: IMediaCardProp) => {
	const [games, setGames] = useState<GamesObj>();

	const getStories = () => {
		const result = fetch(backendHost + `api/medias/${mediaOid}`).then(res =>
			res.json()
		);
		return result;
	};

	useEffect(() => {
		getStories().then(results => setGames(results));
	}, []);

	return (
		<div key={mediaOid} className="media__card">
			{games ? (
				<>
					<h3 className="media__card__title">{games.name}</h3>
					<img src={games.imgurl} className="img" />
					{games.released ? (
						<p>
							<strong>Released date:</strong> {games.released}
						</p>
					) : (
						<p>no released date yet</p>
					)}
					{games.ratingFromAPI ? (
						<p>
							<strong>Rating:</strong> {games.ratingFromAPI}
						</p>
					) : (
						<p>no rating available</p>
					)}
					{games.metaData.platforms && (
						<ul className="media__card__games">
							<strong>Platforms:</strong>
							{games.metaData.platforms.map(platform => (
								<li style={{ textAlign: 'center', listStyle: 'none' }}>
									{platform.platform.name}
								</li>
							))}
						</ul>
					)}
				</>
			) : null}
		</div>
	);
};

export default MediaCardGame;
