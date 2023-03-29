import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bubbles } from './components/Bubbles';
import { BubblesDiagram } from './components/BubblesDiagram';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { StoryObj } from './types';

export const Map = () => {
	const params = useParams();
  const storyId = params.storyId || '2'

  const [story, setStory] = useState<StoryObj>()

	const getStory =  () => {
    const result =  fetch(`http://localhost:3000/api/stories/${storyId}`).then(res => res.json())
    return result
  }

	useEffect(() => {
		getStory().then(result => setStory(result)).then(() => console.log(story))
	}, []);
  
	return (
		<>
			<Header />
			{/* <Bubbles /> */}
      {story ? (<><BubblesDiagram beginningStoryId={story.id} beginningStoryName={story.storyname} beginningStoryLabels={story.labels} /></>):(<p>Loading</p>)}
			<Footer />
		</>
	);
};

export default Map;
