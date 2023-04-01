import { useState } from "react"
import { Label } from "../types"

interface LabelComponentProps {label: Label, userId: string, index: number, votingHandler: (labelName:string, userId: string) => void, removeHandler: (labelName:string) => void}

export const LabelComponent = ({label, userId, index, votingHandler, removeHandler}:LabelComponentProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <div 
        className={`labels-list_item + ${label.voted_users.includes(userId || '') ? ' voted' : null}`} 
        key={index} 
        style = {{cursor: 'pointer'}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => votingHandler(label.name, userId)} 
        >
        <span>{label.name}</span>
        { isHovered && label.voted_users.length === 0 && <button className="remove-button" onClick={() => removeHandler(label.name)}>-</button>}
      </div>
    </>
  )
}