import { useEffect, useState } from 'react';
import useAuth from '../useAuth';
import { Review } from './Review';
import { Reviewtype } from '../types';
import { getReviewsByStoryId } from '../api';
import { ReviewForm } from './ReviewForm';
import { useParams } from 'react-router-dom';
import './ReviewsArea.css';

const ReviewsArea = () => {
	const params = useParams();

	const [reviews, setReviews] = useState<Reviewtype[]>([]);
	const { isAuthenticated, user } = useAuth();
	const [update, setUpdate] = useState(false);

	const gettingReviews = async () => {
		if (params?.id) {
			const allReviews = await getReviewsByStoryId(params.id);
			console.log(allReviews);
			setReviews(allReviews);
		}
	};

	const updateReviews = async () => {
		setUpdate(!update);
	};

	useEffect(() => {
		isAuthenticated();
	}, []);
	useEffect(() => {
		gettingReviews();
	}, [user, update]);

	return (
		<div className="review-area">
			<h2 style={{ textAlign: 'left' }}>Reviews:</h2>
			<section>
				{reviews && (
					<ul>
						{reviews.map((review: any) => {
							return (
								<Review
									user={review.userName}
									reviewId={review.id}
									content={review.content}
									rating={review.rating}
								/>
							);
						})}
					</ul>
				)}
			</section>
			<section>
				<ReviewForm update={updateReviews} />
			</section>
		</div>
	);
};

export default ReviewsArea;
