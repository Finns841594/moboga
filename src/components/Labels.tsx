import { useState, useEffect } from 'react';
import { StoryObj, Label } from '../types';
import useAuth from '../useAuth';
import { LabelComponent } from './Label';
import './Labels.css';

interface ILabelsProp {
	initialLabels: Label[];
	storyId: string;
}

const backendHost = import.meta.env.VITE_BE_HOST;

const Labels = ({initialLabels, storyId}:ILabelsProp) => {
  const [labels, setLabels] = useState<Label[]>(initialLabels);
  const [addLabel, setAddLabel] = useState(false)
  const [addNewLabelToDB, setAddNewLabelToDB] = useState(false)
  const [addNewLabelToDBLabelContent, setAddNewLabelToDBLabelContent] = useState('')
  const [allLabels, setAllLabels] = useState<Label[]>();
  const [update, setUpdate] = useState(false)
  

	const { isAuthenticated, user } = useAuth();

	// getting all labels from the backend
	const getALLLabels = () => {
		const results = fetch(backendHost + `api/labels`).then(res => res.json());
		return results;
	};
	// getting the current story in oder to get labels
	const getStories = () => {
		const result = fetch(backendHost + `api/stories/${storyId}`).then(res =>
			res.json()
		);
		return result;
	};

	// showing or hiding the dropdown
	const addingHandler = () => {
		setAddLabel(!addLabel);
	};

  // selecting a label from the dropdown
   const addLabelToStory = (labelName:string) => {
    const url = backendHost + `api/labels/${labelName}/` + storyId
    const results = fetch(url, {method: 'POST'}).then(res => res.json());
    return results;
  } 
  // adding a label to the story
  const selectingHandler = async (selectedValue:string) => {
    if (selectedValue !== 'New Label...') {
    const response = await addLabelToStory(selectedValue)
    // just to update the UI
    console.log('🤪 adding label: ', selectedValue, 'to story: ', storyId, 'with response: ', response)
    setUpdate(!update)
    setAddLabel(!addLabel)
    } else {
      setAddNewLabelToDB(true)
      setAddLabel(!addLabel)
    }
  }

  // adding a new label to the database
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddNewLabelToDBLabelContent(e.target.value);
  };
  const addNewLabelToDatabase = (labelName:string) => {
    const url = backendHost + `api/labels/` + labelName
    const results = fetch(url, {method: 'POST'}).then(res => res.json());
    return results;
  }
  const addLabelToDBHandler = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAddNewLabelToDB(false)
    if (addNewLabelToDBLabelContent !== '') {
    const response = addNewLabelToDatabase(addNewLabelToDBLabelContent)
    console.log('🤪 adding a new label to the database: ', response)}
  }

  // voting a label
  const voteLabel = async (labelName:string, userId: string) => {
    const url = backendHost + `api/labels/${labelName}/` + storyId + '/' + userId
    const results = await fetch(url, {method: 'POST'})
    return results;
  }
  const votingHandler = async (labelName:string, userId: string) => {
    console.log('🤪 votingHandler', labelName, userId)
    const response = await voteLabel(labelName, userId)
    console.log('🤪 votingHandler response', response)
    setUpdate(!update)
  }

  // removing a label from the story
  const removeLabelFromStory = (labelName:string, storyId:string) => {
    const url = backendHost + `api/labels/${labelName}/` + storyId
    const results = fetch(url, {method: 'DELETE'}).then(res => res.json());
    return results;
  }
  const removeHandler = async (labelName:string) => {
    console.log('🤪 removing label: ', labelName, 'from story: ', storyId, '')
    const response = await removeLabelFromStory(labelName, storyId)
    setUpdate(!update)
  }

	useEffect(() => {
		isAuthenticated();
		getALLLabels().then(results => setAllLabels(results));
	}, []);

	useEffect(() => {
		getStories().then(story => setLabels(story.labels));
	}, [update]);

  return (
    <div>
      <div className="labels-intro">
        <h2>Labels:</h2>
        <p>Click the label to vote the ones you like!</p>
      </div>
      <ul className="labels-list">
        {labels.length > 0 ? ( <> 
          {/* showing top 6 labels */}
          {/* {console.log('🤪 Incoming info',labels, user)} */}
          {/* About the labels */}
          { user ? (
            labels.slice(0,6).map((label, index) => <li key={index}><LabelComponent label={label} userId={user.userId} index={index} votingHandler={votingHandler} removeHandler={removeHandler} /></li>)
          ):(
            labels.slice(0,6).map((label, index) => <li className={`labels-list_item`} key={index} >{label.name}</li>)
          )}
          </>
        ):null}    
        {/* About option to add label */}
        { user ? (
           addLabel ? (
            <>
            <a onClick={() => addingHandler()} style={{marginLeft:'5px'}}><i className="fa-solid fa-plus fa-2xl" style={{color: "#db3dff"}}></i></a>
            <select className="label-list_dropdown" onChange={(e) => selectingHandler(e.target.value)} >
              <option disabled>Create a label</option>
              <option value="New Label...">New Label...</option>
              <option disabled selected>Select an existing label</option>
              {allLabels?.map((label, index) => <option value={label.name} key={index} >{label.name}</option>)}
            </select>
            </>
          ):(
            <a onClick={() => addingHandler()} style={{marginLeft:'5px'}}><i className="fa-solid fa-plus fa-2xl" style={{color: "#db3dff"}}></i></a>
          )
          ):null}
        {/* input area for adding a label to database */}
        { user ? (
          addNewLabelToDB && (
          <>
          <form onSubmit={addLabelToDBHandler} style={{ display:'flex', flexDirection:'row', marginLeft:'10px'}}>
            <input type="text" placeholder="New Label..." style={{display: addNewLabelToDB ? 'block' : 'none'}} className='labels_addbar' onChange={handleChange}></input>
            <button style={{display: addNewLabelToDB ? 'block' : 'none'}} type='submit'>Add</button>
          </form>
          </>)
        ):null}
      </ul>     
    </div>
  )
}


export default Labels;
