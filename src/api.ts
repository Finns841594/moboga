import axios from 'axios';

const backendHost = import.meta.env.VITE_BE_HOST;
export const getReviews = async (userId: string) => {
	try {
		const response = await axios
			.get(backendHost + `api/reviews`, {
				headers: { 'Content-Type': 'application/json' },
				data: { userId },
			})
			.then(res => res.data);
		return response;
	} catch (error: any) {
		console.error(error.response);
	}
};

export const getReviewsByStoryId = async (storyId: string) => {
	try {
		const response = await axios
			.get(backendHost + `api/reviews_by_story_id/${storyId}`)
			.then(res => res.data);
		console.log(response, 'response from getting reviews by story id 🥲');
		return response;
	} catch (error: any) {
		console.error(error.response);
	}
};

export const deleteReview = async (reviewId: string) => {
	await axios
		.delete(backendHost + 'api/reviews', {
			headers: { 'Content-Type': 'application/json' },
			data: { reviewId },
		})
		.then(response => {
			console.log(response);
		})
		.catch(error => console.log(`${error}: Error fetching project data`));
};
