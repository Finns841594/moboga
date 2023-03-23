import { useState, useEffect } from "react"

export const StoryBubble = () => {
  const [story, setStory] = useState('')
  const id = '641c4510514960454e872921'

  const getStories =  () => {
    const result =  fetch(`http://localhost:3000/api/stories/${id}`).then(res => res.json())
    return result
  }

  useEffect(() => {
    getStories().then(results => setStory(results))
  },[])

  return (
    <>
    { story ? (
    <>
    <p>{story!.storyname}</p>
    <ul>
      <li>{story.labels[0].name}</li>
      <li>{story.labels[1].name}</li>
      <li>{story.labels[2].name}</li>
    </ul>
    </>
    ):(<p>loading</p>)}
    </>
  )
}