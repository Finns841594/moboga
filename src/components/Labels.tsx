import { useState, useEffect } from "react"
import { StoryObj, Label } from "../types"
import './Labels.css';

interface ILabelsProp {labels: Label[]}

const Labels = ({labels}:ILabelsProp) => {
  return (
    <div>
      <ul className="labels-list">
        {labels.length > 0 ? ( <>
          <li className="labels-list_item">{labels[0].name}</li>
          <li className="labels-list_item">{labels[1].name}</li>
          <li className="labels-list_item">{labels[2].name}</li>
          </>
        ):null}
      </ul>
      
    </div>
  )
}

export default Labels