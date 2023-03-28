import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../useAuth';
import { Review } from './Review';
import { Reviewtype } from '../types';
import { getReviews } from '../api';

const ReviewsArea = () => {
	const [reviews, setReviews] = useState<Reviewtype[]>([]);
	const { authenticated, isAuthenticated, user } = useAuth();

	const gettingReviews = async () => {
		if (user?.userId) {
			const allReviews = await getReviews(user?.userId);
			console.log(allReviews);
			setReviews(allReviews);
		}
	};

	useEffect(() => {
		isAuthenticated();
	}, []);
	useEffect(() => {
		gettingReviews();
	}, [user]);

	return (
		<div>
			{authenticated && (
				<>
					<div>REVIEWS:</div>
					<section>
						{reviews && (
							<ul>
								{reviews.map((review: any) => {
									return (
										<Review
											reviewId={review.id}
											content={review.content}
											rating={review.rating}
										/>
									);
								})}
							</ul>
						)}
					</section>
				</>
			)}
		</div>
	);
};

export default ReviewsArea;
