import { useState, useEffect } from "react"
import { StoryObj, Label } from "../types"
import './Labels.css';

interface ILabelsProp {labels: Label[]}

const Labels = ({labels}:ILabelsProp) => {
  const [addLabel, setAddLabel] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Option 1');

  const clickHandler = () => {
    setAddLabel(!addLabel)
  }

  return (
    <div>
      <ul className="labels-list">
        {labels.length > 0 ? ( <> 
          {/* showing top 8 labels */}
          {labels.slice(0,8).map(label => <li className="labels-list_item">{label.name}</li>)}
          { addLabel ? (
            <select onChange={clickHandler}>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          ):(
            <li><a onClick={clickHandler}><h1>+</h1></a></li>
          )}
          </>
        ):null}
      </ul>
      
    </div>
  )
}

export default Labels