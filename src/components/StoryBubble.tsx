import { useState, useEffect } from "react"
import { StoryObj } from "../types"
import { LabelBubble } from "./LabelBubble"
// import dotenv from 'dotenv'

// dotenv.config();
// const backEndHost = process.env.BE_HOST
// console.log('😘', backEndHost)

interface IStoryBubbleProp {storyId : string, next: boolean } 

export const StoryBubble = ({storyId, next}:IStoryBubbleProp) => {
  const [story, setStory] = useState<StoryObj>()

  const getStories =  () => {
    const result =  fetch(`http://localhost:3000/api/stories/${storyId}`).then(res => res.json())
    return result
  }

  useEffect(() => {
    getStories().then(results => setStory(results))
  },[])

  return (
    <div className="story-bubble" >
    { story ? (
      <>
        <h4>{story!.storyname}</h4>
        <div>
          { (story.games.length > 0) ? (
            <a href={`./details/games/${story.id}`} ><button>games</button></a>
          ) : null }
          { (story.movies.length > 0) ? (
            <a href={`./details/movies/${story.id}`} ><button>movies</button></a>
          ) : null }
          { (story.books.length > 0) ? (
            <a href={`./details/books/${story.id}`} ><button>books</button></a>
          ) : null }
        </div>
        {/* <ul>
            { next ? (
              <>
                <li><LabelBubble labelName={story.labels[0].name} /></li>
                <li><LabelBubble labelName={story.labels[1].name} /></li>
                <li><LabelBubble labelName={story.labels[2].name} /></li>
              </>
            ) : null}
        </ul> */}
      </>
    ):(<p>loading</p>)}
    </div>
  )
}