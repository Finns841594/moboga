import { useState } from "react"
import { StoryObj } from "./types"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import MediaCardsBooks from "./components/MediaCardsBooks"
import MediaCardsGames from "./components/MediaCardsGames"
import MediaCardsMovies from "./components/MediaCardsMovies"
import { SearchToAddStory } from "./components/SearchToAddStory"

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
        console.log('🤪 results:', results)
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
        return getStories(res.responseGames.addedToStoryWithId)})
      .then((story) => {
        console.log('🤪🤪🤪 story:', story)
        setStory(story)})
  }

  const deleteAStory = (storyId: string) => {
    const url = backendHost + `api/stories/${storyId}`
    const response = fetch(url, {method: 'DELETE'}).then(res => res.json())
    console.log('🎦🎦🎦 deleted story:', response)
    return response;
  }

  const deleteStoryHandler = () => {
    if (story) {
      deleteAStory(story?.id)
      setStory(undefined)
    }
  }


  return (
    <>
      <Header />
      <SearchToAddStory onSearch={handleSearch}/>
      { story ? (
         story.movies.length > 0  ? (
          <>
            <h2>Help us check the story: {story.storyname}</h2>
            <h1>Founded Movies</h1>
            <MediaCardsMovies medias={story['movies']} />
            <h1>Founded Books</h1>
            <MediaCardsBooks medias={story['books']} />
            <h1>Founded Games</h1>
            <MediaCardsGames medias={story['games']} />
            <div>
              <a href={`/details/movies/${story.id}`}><button>Save Story</button></a>
              <button onClick={deleteStoryHandler}> Cancel</button>
            </div>
          </>
          ) : (
          <h4>Loading Media Contents of the Story</h4>)
      ):null}
      <Footer />
    </>
  )
}

export default AddStory