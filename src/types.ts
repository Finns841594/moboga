
type StoryObj = {
  id: number
  storyname: string,
  labels: Label[],
  books: MediaObj[]
  movies: MediaObj[],
  games: MediaObj[],
  rating: number
}

type Label = {
  id: string,
  name: string,
  voted_user: string[]
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

export type { StoryObj, MediaObj }
// const bookRating = books.reduce((acc, cur), cur.ratingFromAPI + acc)