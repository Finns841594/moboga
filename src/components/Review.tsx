import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../useAuth';
import { Reviewtype } from '../types';
import { deleteReview, getReviews } from '../api';

type ReviewProps = {
	reviewId: string;
	content: string;
	rating: string;
};
export const Review = ({ reviewId, content, rating }: ReviewProps) => {
	const handleDelete = async () => {
		await deleteReview(reviewId);
	};
	const handleEdit = () => {};
	return (
		<section>
			<button onClick={handleDelete}>Delete</button>
			<button onClick={handleEdit}>Edit</button>
			<li key={reviewId}>
				<p>{content}</p>
				<p>Rating: {rating}</p>
			</li>
		</section>
	);
};
