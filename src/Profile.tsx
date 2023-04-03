import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import useAuth from './useAuth';
import { getReviewsByUserId } from './api';
import { Reviewtype } from './types';
import { ReviewProfile } from './components/ReviewProfile';
import './Profile.css';

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
					<div className="profile-area" style={{ marginTop: '40px' }}>
						<h2 className="profile-area__title" style={{ textAlign: 'left', marginBottom: '30px' }}>
							Manage your reviews:
						</h2>
						<section className='profile-area__review-section' style={{ alignContent: 'center' }}>
							{reviews.length > 0 ? (
								<ul style={{ padding: 0 }}>
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
							) : (
								<div>Go to your favorite story and create a new review!</div>
							)}
						</section>
					</div>
					<Footer />
				</>
			)}
		</>
	);
};
