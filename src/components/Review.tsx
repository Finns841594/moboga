type ReviewProps = {
	userName: string;
	reviewId: string;
	content: string;
	rating: string;
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
					<p>Rating: {rating}</p>
				</div>
				<p>{content}</p>
			</li>
		</section>
	);
};
