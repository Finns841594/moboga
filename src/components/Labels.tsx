import { useState, useEffect } from "react"
import { StoryObj, Label } from "../types"

interface ILabelsProp {labels: Label[]}

const Labels = ({labels}:ILabelsProp) => {
  return (
    <div>
      <ul>
        {labels ? ( <>
          <li>{labels[0].name}</li>
          <li>{labels[1].name}</li>
          <li>{labels[2].name}</li>
          </>
        ):null}
      </ul>
      
    </div>
  )
}

export default Labels