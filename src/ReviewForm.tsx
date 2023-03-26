import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MediaObj } from './types';
import useAuth from './useAuth';
import { Header } from './components/Header';

export const ReviewForm = () => {
	const params = useParams();
	const [media, setMedia] = useState<MediaObj>();
	const [content, setContent] = useState('');
	const [rating, setRating] = useState('');
	const { authenticated, isAuthenticated } = useAuth();

	if (params.mediaId) {
		const getMedia = async () => {
			const result = await fetch(
				`http://localhost:3000/api/medias/${params.mediaId}`
			).then(res => res.json());
			return result;
		};
		useEffect(() => {
			isAuthenticated();
			getMedia().then(results => setMedia(results));
		}, []);
	}

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			const response = await axios
				.post('http://localhost:3000/api/reviews', {
					content,
					rating,
					mediaId: params.mediaId,
				})
				.then(res => res);
			console.log('REVIEW CREATED!! 🥳', response);
		} catch (error: any) {
			console.log(error);
		}
	};
	return (
		<>
			<Header />
			{authenticated && (
				<form onSubmit={handleSubmit}>
					{media && (
						<>
							<h2>Add a new review for {media.name}:</h2>
							<h4>{media.type}</h4>
							<textarea
								required
								placeholder="Write here your review"
								value={content}
								onChange={e => setContent(e.target.value)}
							/>
							<label>
								rating (0-10):
								<input
									type="number"
									required
									max={10}
									min={0}
									value={rating}
									onChange={e => setRating(e.target.value)}
								/>
							</label>
							<button type="submit">Send</button>
						</>
					)}
				</form>
			)}
		</>
	);
};
