
type StoryObj = {
  id: number
  storyname: string,
  labels:[{magic:string[]},{monsters:string[]}],
  books: MediaObj[]
  movies: MediaObj[],
  games: MediaObj[],
  rating: number
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