import { useEffect, useState } from 'react';
import useAuth from '../useAuth';
import { Review } from './Review';
import { Reviewtype, StoryObj } from '../types';
import { getReviewsByStoryId } from '../api';
import { ReviewForm } from './ReviewForm';
import { useParams } from 'react-router-dom';
import './ReviewsArea.css';
type ReviewsAreaProps = { story: StoryObj };

const ReviewsArea = ({ story }: ReviewsAreaProps) => {
	const params = useParams();

	const [reviews, setReviews] = useState<Reviewtype[]>([]);
	const { isAuthenticated, user } = useAuth();
	const [update, setUpdate] = useState(false);

	const gettingReviews = async () => {
		if (params?.id) {
			const allReviews = await getReviewsByStoryId(params.id);
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
									userName={review.userName}
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
				<ReviewForm update={updateReviews} story={story} />
			</section>
		</div>
	);
};

export default ReviewsArea;
