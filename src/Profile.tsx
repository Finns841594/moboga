import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import useAuth from './useAuth';
import { getReviewsByUserId } from './api';
import { Reviewtype } from './types';
import { ReviewProfile } from './components/ReviewProfile';

export const Profile = () => {
	const { authenticated, isAuthenticated, user } = useAuth();
	const [reviews, setReviews] = useState<Reviewtype[]>([]);
	const [update, setUpdate] = useState(false);

	const updateReviews = async () => {
		setUpdate(!update);
	};

	const gettingReviewsFromUser = async () => {
		if (user?.userId) {
			const allReviews = await getReviewsByUserId(user?.userId);
			setReviews(allReviews);
		}
	};

	useEffect(() => {
		isAuthenticated();
	}, []);

	useEffect(() => {
		gettingReviewsFromUser();
	}, [user, update]);

	return (
		<>
			{authenticated && (
				<>
					<Header />
					<div className="">
						<h2 style={{ textAlign: 'left' }}>Manage your reviews:</h2>
						<section>
							{reviews && (
								<ul>
									{reviews.map((review: any) => {
										return (
											<ReviewProfile
												reviewId={review.id}
												storyName={review.storyName}
												content={review.content}
												rating={review.rating}
												updateReviews={updateReviews}
											/>
										);
									})}
								</ul>
							)}
						</section>
					</div>
					<Footer />
				</>
			)}
		</>
	);
};
