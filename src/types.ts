
type StoryObj = {
  id: number
  storyname: string,
  labels: Label[],
  books: MediaInStory[]
  movies: MediaInStory[],
  games: MediaInStory[],
  rating: number
}

type Label = {
  id: string,
  name: string,
  voted_user: string[]
}

type MediaInStory = {
  oid: string,
  name: string
}

type MediaObj = {
  id: number
  name: string
  description: string
  year: number
  imgurl: string
  ratingFromAPI: number
  voteNumberFromAPI: number
}

export type { StoryObj, MediaObj, Label, MediaInStory }
// const bookRating = books.reduce((acc, cur), cur.ratingFromAPI + acc)