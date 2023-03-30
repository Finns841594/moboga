import { Rating } from 'react-simple-star-rating';

type ReviewProps = {
	userName: string;
	reviewId: string;
	content: string;
	rating: number;
};
export const Review = ({
	userName,
	reviewId,
	content,
	rating,
}: ReviewProps) => {
	return (
		<section>
			<li className="review-item" key={reviewId}>
				<div className="review-item__title">
					<h4>{userName}</h4>
					<Rating readonly={true} initialValue={rating} size={23} />
				</div>
				<p>{content}</p>
			</li>
		</section>
	);
};
