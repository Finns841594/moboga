import { useEffect, useState } from 'react';
import { deleteReview, editReview } from '../api';
import { Rating } from 'react-simple-star-rating';
import './ReviewsArea.css';

type ReviewProps = {
	reviewId: string;
	content: string;
	rating: number;
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
		<section className='review-profile-area'>
			<li className="review-item" key={reviewId}>
				<div className="review-item__title">
					<h4>{storyName}</h4>
					<Rating readonly={true} initialValue={rating} size={23} />
				</div>
				{isEditing ? (
					<div className="edit-container">
						<textarea
							onChange={e => setNewContent(e.target.value)}
							className="edit-container__textarea"
							value={newContent}
						></textarea>
						<button className="reviews-button save" onClick={handleEdit}>
							Save
						</button>
					</div>
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
