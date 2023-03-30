import axios from 'axios';

const backendHost = import.meta.env.VITE_BE_HOST;

export const getReviewsByStoryId = async (storyId: string) => {
	try {
		const response = await axios
			.get(`${backendHost}api/reviews_by_story_id/${storyId}`)
			.then(res => res.data);
		return response;
	} catch (error: any) {
		console.error(error.response);
	}
};
export const getReviewsByUserId = async (userId: string) => {
	try {
		const response = await axios
			.get(`${backendHost}api/reviews_by_user_id/${userId}`)
			.then(res => res.data);
		return response;
	} catch (error: any) {
		console.error(error.response);
	}
};

export const deleteReview = async (reviewId: string) => {
	await axios
		.delete(`${backendHost}api/reviews/${reviewId}`)
		.catch(error => console.log(`${error}: Error deleting review`));
};

export const editReview = async (reviewId: string, newContent: string) => {
	try {
		const response = await axios
			.patch(`${backendHost}api/reviews/${reviewId}`, {
				newContent,
			})
			.then(res => res.data);
		return response;
	} catch (error: any) {
		console.error(error.response);
	}
};
