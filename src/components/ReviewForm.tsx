import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoryObj } from '../types';
import useAuth from '../useAuth';
import { Rating } from 'react-simple-star-rating';
const backendHost = import.meta.env.VITE_BE_HOST;

interface IReviewFormProp {
	update: () => void;
	story: StoryObj;
}

export const ReviewForm = ({ update, story }: IReviewFormProp) => {
	const params = useParams();
	const [content, setContent] = useState('');
	const [rating, setRating] = useState(0);
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
					storyName: story.storyname,
				})
				.then(res => res);
			setContent('');
			update();
			setRating(0);
		} catch (error: any) {
			console.log(error);
		}
	};
	const handleRating = (rate: number) => {
		setRating(rate);
	};
	// Optinal callback functions
	const onPointerEnter = () => console.log('Enter');
	const onPointerLeave = () => console.log('Leave');
	const onPointerMove = (value: number, index: number) =>
		console.log(value, index);

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
							<Rating
								onClick={handleRating}
								onPointerEnter={onPointerEnter}
								onPointerLeave={onPointerLeave}
								onPointerMove={onPointerMove}
								transition={true}
								showTooltip={true}
							/>
							{/* <label htmlFor="rating">Rating:</label>
							<input
								id="rating"
								type="number"
								required
								max={10}
								min={0}
								value={rating}
								onChange={e => setRating(e.target.value)}
								className="review__rate-input"
							/> */}
						</div>
						<button type="submit">Add</button>
					</div>
				</form>
			)}
		</>
	);
};
