import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../useAuth';
const backendHost = import.meta.env.VITE_BE_HOST;

interface IReviewFormProp {
	update: () => void;
}

export const ReviewForm = ({ update }: IReviewFormProp) => {
	const params = useParams();
	const [content, setContent] = useState('');
	const [rating, setRating] = useState('');
	const { authenticated, isAuthenticated, user } = useAuth();

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			const response = await axios
				.post(backendHost + 'api/reviews', {
					userId: user?.userId,
					userName: user?.name,
					content,
					rating,
					mediaType: params.media,
					storyId: params.id,
				})
				.then(res => res);
			setContent('');
			setRating('');
			update();
		} catch (error: any) {
			console.log(error);
		}
	};
	useEffect(() => {
		isAuthenticated();
	}, []);
	return (
		<>
			{authenticated && (
				<form onSubmit={handleSubmit}>
					<h2 style={{ textAlign: 'left' }}>Add a new review:</h2>
					<div className="add-review-area">
						<textarea
							required
							placeholder="Write here your review"
							value={content}
							onChange={e => setContent(e.target.value)}
							className="review__text-input"
						/>
						<div>
							<label htmlFor="rating">Rating:</label>
							<input
								id="rating"
								type="number"
								required
								max={10}
								min={0}
								value={rating}
								onChange={e => setRating(e.target.value)}
								className="review__rate-input"
							/>
						</div>
						<button type="submit">Add</button>
					</div>
				</form>
			)}
		</>
	);
};
