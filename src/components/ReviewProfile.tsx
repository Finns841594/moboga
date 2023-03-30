import { useEffect, useState } from 'react';
import { deleteReview, editReview } from '../api';
import './ReviewsArea.css';

type ReviewProps = {
	reviewId: string;
	content: string;
	rating: string;
	storyName: string;
	updateReviews: () => void;
};
export const ReviewProfile = ({
	reviewId,
	content,
	rating,
	storyName,
	updateReviews,
}: ReviewProps) => {
	const [newContent, setNewContent] = useState(content);
	const [isEditing, setIsEditing] = useState(false);
	const handleDelete = async () => {
		await deleteReview(reviewId);
		updateReviews();
	};
	const handleEdit = async () => {
		setIsEditing(!isEditing);
		await editReview(reviewId, newContent);
		updateReviews();
	};
	useEffect(() => {
		updateReviews();
	}, [newContent]);

	return (
		<section>
			<li className="review-item" key={reviewId}>
				<div className="review-item__title">
					<h4>{storyName}</h4>
					<p>Rating: {rating}</p>
				</div>
				{isEditing ? (
					<>
						<textarea
							onChange={e => setNewContent(e.target.value)}
							value={newContent}
						></textarea>
						<button onClick={handleEdit}>Save</button>
					</>
				) : (
					<p>{content}</p>
				)}
				<span className="reviews-button-area">
					<button className="reviews-button" onClick={handleDelete}>
						Delete
					</button>
					<button
						className="reviews-button"
						onClick={() => setIsEditing(!isEditing)}
					>
						Edit
					</button>
				</span>
			</li>
		</section>
	);
};
