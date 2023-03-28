import axios from 'axios';

export const getReviews = async (userId: string) => {
	try {
		const response = await axios
			.get(`http://localhost:3000/api/reviews`, {
				headers: { 'Content-Type': 'application/json' },
				data: { userId },
			})
			.then(res => res.data);
		console.log(response, 'response🥲');
		return response;
	} catch (error: any) {
		console.error(error.response);
	}
};

export const deleteReview = async (reviewId: string) => {
	await axios
		.delete('http://localhost:3000/api/reviews', {
			headers: { 'Content-Type': 'application/json' },
			data: { reviewId },
		})
		.then(response => {
			console.log(response);
		})
		.catch(error => console.log(`${error}: Error fetching project data`));
};
