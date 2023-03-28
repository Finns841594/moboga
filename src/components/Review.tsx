import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../useAuth';
import { Reviewtype } from '../types';
import { deleteReview, getReviews } from '../api';

type ReviewProps = {
	user: string;
	reviewId: string;
	content: string;
	rating: string;
};
export const Review = ({ user, reviewId, content, rating }: ReviewProps) => {
	const handleDelete = async () => {
		await deleteReview(reviewId);
	};
	const handleEdit = () => {};
	return (
		<section >
			{/* <button onClick={handleDelete}>Delete</button>
			<button onClick={handleEdit}>Edit</button> */}
			<li className='review-item' key={reviewId}>
				<div className='review-item__title'>
					<h4>{user}</h4>
					<p>Rating: {rating}</p>
				</div>
				<p>{content}</p>
			</li>
		</section>
	);
};
