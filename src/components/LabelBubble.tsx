import { useState, useEffect } from "react"
import { StoryObj } from "../types"
import { StoryBubble } from "./StoryBubble"

interface ILabelBubbleProp {labelName : string} 


export const LabelBubble = ({labelName}:ILabelBubbleProp) => {
  const [stories, setStories] = useState<StoryObj[]>()

  const getStories =  () => {
    const results = fetch(`http://localhost:3000/api/stories/labels/${labelName}`).then(res => res.json())
    return results
  }

  useEffect(() => {
    getStories().then(results => setStories(results))
  },[])

  return (
    <div className="label-bubble" >
      <h5>{labelName}</h5>
      {/* { stories ? ( stories.map(story => {
          return <div>
            <StoryBubble storyId={String(story.id)} next={false} />
          </div>
      })
      ):(<p>loading</p>)} */}
    </div>
  )
}