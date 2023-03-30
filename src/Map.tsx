import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bubbles } from './components/Bubbles';
import { BubblesDiagram } from './components/BubblesDiagram';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { NodeData, StoryObj } from './types';

const backendHost = import.meta.env.VITE_BE_HOST;


const nodeData = {
  current: 'current layer',
  isStory: true,
  children: []
}

const generateDataTree = (initialStoryName:string, iterNum: number):any => {
  if (iterNum < 1) {
    return {
    current: 'current layer',
    isStory: true,
    children: []
  }
  } else {
    return generateDataTree(initialStoryName, iterNum - 1)
  }
}

export const Map = () => {
	const params = useParams();
	const storyId = params.storyId || '3eaec4a5-8642-46b1-a9dc-6c7b579844a2'; // default story id is for 'The last of us'
  
  // Get all stories
  const [stories, setStories] = useState<StoryObj[]>();

	const getStories = () => {
		const result = fetch(backendHost + `api/stories`).then(res =>
			res.json()
		);
		return result;
	};

	useEffect(() => {
		getStories().then(results => setStories(results));
	}, []);
	const [story, setStory] = useState<StoryObj>();

	const getStory = () => {
		const result = fetch(backendHost + `api/stories/${storyId}`).then(res =>
			res.json()
		);
		return result;
	};

	useEffect(() => {
		getStory()
			.then(result => setStory(result))
			.then(() => console.log(story));
	}, []);

	return (
		<>
			<Header />
			{/* <Bubbles /> */}
			{story && stories ? (
				<>
					<BubblesDiagram
						beginningStoryId={story.id}
						beginningStoryName={story.storyname}
						beginningStoryLabels={story.labels}
            allStories={stories}
					/>
				</>
			) : (
				<p>Loading</p>
			)}
			<Footer />
		</>
	);
};

export default Map;
