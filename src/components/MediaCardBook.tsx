import { useState, useEffect } from 'react';

const backendHost = import.meta.env.VITE_BE_HOST;

interface IMediaCardProp {
	mediaOid: string;
}

type BooksObj = {
	id: string;
	name: string;
	description: string;
	released: string;
	imgurl: string;
	ratingFromAPI: number;
	voteNumberFromAPI: number;
	metaData: BooksMetadata;
};

type BooksMetadata = {
	volumeInfo: { authors: string[]; publisher: string };
	saleInfo: { buyLink: string };
};

const MediaCardBook = ({ mediaOid }: IMediaCardProp) => {
	const [books, setBooks] = useState<BooksObj>();

	const getStories = () => {
		const result = fetch(backendHost + `api/medias/${mediaOid}`).then(res =>
			res.json()
		);
		return result;
	};

	useEffect(() => {
		getStories().then(results => setBooks(results));
	}, []);

	return (
		<div key={mediaOid} className="media__card">
			{books ? (
				<>
					<h3 className="media__card__title">{books.name}</h3>
					{books.metaData.saleInfo.buyLink ? (
						<a href={books.metaData.saleInfo.buyLink}>
							<img src={books.imgurl} className="img" />
						</a>
					) : (
						<img src={books.imgurl} className="img" />
					)}
					{books.released ? (
						<p>
							<strong>Released date:</strong> {books.released}
						</p>
					) : (
						<p>no released date yet</p>
					)}
					{books.metaData.volumeInfo.authors ? (
						books.metaData.volumeInfo.authors.map((author: string) => (
							<p>{author}</p>
						))
					) : (
						<p>no information about authors</p>
					)}
					{books.description ? (
						<p className="media__card__movies">{books.description}</p>
					) : (
						<p>no description available</p>
					)}
					{books.metaData.volumeInfo.publisher && (
						<p>
							<strong>Publisher:</strong> {books.metaData.volumeInfo.publisher}
						</p>
					)}
				</>
			) : null}
		</div>
	);
};

export default MediaCardBook;
