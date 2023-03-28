type StoryObj = {
	id: string;
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
	id: string;
	name: string;
	description: string;
	type: string;
	year: number;
	imgurl: string;
	ratingFromAPI: number;
	voteNumberFromAPI: number;
}

type UserInfo = {
	userId: string;
	email: string;
	name: string;
	lastName: string;
};;

type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	hashedPassword: string;
};

type Reviewtype = {
	id: string;
	content: string;
	rating: string;
};

export type { StoryObj, MediaObj, Label, MediaInStory, User, Reviewtype, UserInfo };
// const bookRating = books.reduce((acc, cur), cur.ratingFromAPI + acc)
