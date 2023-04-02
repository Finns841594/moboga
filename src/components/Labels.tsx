import { useState, useEffect } from "react"
import { StoryObj, Label } from "../types"
import useAuth from "../useAuth";
import { LabelComponent } from "./Label";
import './Labels.css';

interface ILabelsProp {initialLabels: Label[], storyId: string}

const backendHost = import.meta.env.VITE_BE_HOST;

const Labels = ({initialLabels, storyId}:ILabelsProp) => {
  const [labels, setLabels] = useState<Label[]>(initialLabels);
  const [addLabel, setAddLabel] = useState(false)
  const [allLabels, setAllLabels] = useState<Label[]>();
  const [update, setUpdate] = useState(false)
  
	const { isAuthenticated, user } = useAuth();

  // getting all labels from the backend
  const getALLLabels = () => {
    const results = fetch(backendHost + `api/labels`).then(res => res.json());
    return results;
  }
  // getting the current story in oder to get labels
  const getStories = () => {
    const result = fetch(backendHost + `api/stories/${storyId}`).then(res =>
      res.json()
    );
    return result;
  };  

  // showing or hiding the dropdown
  const addingHandler = () => {
    setAddLabel(!addLabel)
  }

  // selecting a label from the dropdown
   const addLabelToStory = (labelName:string) => {
    const url = backendHost + `api/labels/${labelName}/` + storyId
    const results = fetch(url, {method: 'POST'}).then(res => res.json());
    return results;
  } 
  const selectingHandler = (selectedValue:string) => {
    const response = addLabelToStory(selectedValue)
    // just to update the UI
    setUpdate(!update)
    setAddLabel(!addLabel)
  }

  // voting a label
  const voteLabel = (labelName:string, userId: string) => {
    const url = backendHost + `api/labels/${labelName}/` + storyId + '/' + userId
    const results = fetch(url, {method: 'POST'}).then(res => res.json());
    return results;
  }
  const votingHandler = (labelName:string, userId: string) => {
    console.log('🤪 votingHandler', labelName, userId)
    const response = voteLabel(labelName, userId).then(res => res.json)
    setUpdate(!update)
  }

  // removing a label from the story
  const removeLabelFromStory = (labelName:string, storyId:string) => {
    const url = backendHost + `api/labels/${labelName}/` + storyId
    const results = fetch(url, {method: 'DELETE'}).then(res => res.json());
    return results;
  }
  const removeHandler = (labelName:string) => {
    console.log('🤪 removing label: ', labelName, 'from story: ', storyId, '')
    const response = removeLabelFromStory(labelName, storyId)
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
      <h3>Left Problem: have to mannual refresh after adding or voting</h3>
      <ul className="labels-list">
        {labels.length > 0 ? ( <> 
          {/* showing top 6 labels */}
          {console.log('🤪 Incoming info',labels, user)}
          {/* About the labels */}
          { user ? (
            labels.slice(0,6).map((label, index) => <li><LabelComponent label={label} userId={user.userId} index={index} votingHandler={votingHandler} removeHandler={removeHandler} /></li>)
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
              <option value="new">New Label...</option>
              <option disabled>Select an existing label</option>
              {allLabels?.map((label, index) => <option value={label.name} key={index} >{label.name}</option>)}
            </select>
            </>
          ):(
            <a onClick={() => addingHandler()} style={{marginLeft:'5px'}}><i className="fa-solid fa-plus fa-2xl" style={{color: "#db3dff"}}></i></a>
          )
        ):null}
      </ul>     
    </div>
  )
}

export default Labels