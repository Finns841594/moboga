type StoryObj = {
	id: number;
	storyname: string;
	labels: Label[];
	books: MediaInStory[];
	movies: MediaInStory[];
	games: MediaInStory[];
	rating: number;
};

type Label = {
	id: string;
	name: string;
	voted_user: string[];
};

type MediaInStory = {
	oid: string;
	name: string;
};

type MediaObj = {
	id: number;
	name: string;
	description: string;
	type: string;
	year: number;
	imgurl: string;
	ratingFromAPI: number;
	voteNumberFromAPI: number;
};

type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	hashedPassword: string;
};

export type { StoryObj, MediaObj, Label, MediaInStory, User };
// const bookRating = books.reduce((acc, cur), cur.ratingFromAPI + acc)
