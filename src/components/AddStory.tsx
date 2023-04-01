import { useState } from "react"
import { StoryObj } from "../types"
import { Footer } from "./Footer"
import { Header } from "./Header"
import MediaCardsBooks from "./MediaCardsBooks"
import MediaCardsGames from "./MediaCardsGames"
import MediaCardsMovies from "./MediaCardsMovies"
import { SearchToAddStory } from "./SearchToAddStory"

const backendHost = import.meta.env.VITE_BE_HOST;


const AddStory = () => {
  const [story, setStory] = useState<StoryObj>()

  const getStories = (storyId:string) => {
    const result = fetch(backendHost + `api/stories/${storyId}`).then(res =>
      res.json()
    );
    console.log('🤪🤪🤪 Get the story:', result)
    return result;
  };

  const generateStory = (storyName: string) => {
    const story = fetch(backendHost + `api/stories/` + storyName, {method: 'POST'})
      .then(res => res.json())
      .then(results => {
        console.log('🤪 results:', results.ops[0].id)
        return results.ops[0]}) as Promise<StoryObj>;
    return story;
  }

  const generateMedias = (storyName: string) => {
    const response = fetch(backendHost + `api/generatemedias/` + storyName, {method: 'POST'}).then(res => res.json())
    console.log('🎦🎦🎦 generated medias:', response)
    return response;
  }


  const handleSearch = async (searchTerm: string) => {
    console.log('🤪🤪🤪 searchTerm:', searchTerm)
    generateStory(searchTerm)
      .then((story) => {
        if (story) {
          console.log('✅ Generated Story:', story)
          return generateMedias(story.storyname)
        } else {
          console.log('❌ Generated Story failed')
          return getStories(searchTerm)}})
      .then((res) => {
        console.log('✅ Generated Meidas:', res)
        return getStories(res.responseGames.addedToStory)})
      .then((story) => {
        console.log('🤪🤪🤪 story:', story)
        setStory(story)})
  }

  return (
    <>
      <Header />
      <SearchToAddStory onSearch={handleSearch}/>
      { story ? (
         story.movies.length > 0  ? (
          <>
            <h2>Help us check the story: {story.storyname}</h2>
            <MediaCardsMovies medias={story['movies']} />
            <MediaCardsBooks medias={story['books']} />
            <MediaCardsGames medias={story['games']} />
          </>) : (<h4>Loading Media Contents of the Story</h4>)
      ):null}
      <Footer />
    </>
  )
}

export default AddStory