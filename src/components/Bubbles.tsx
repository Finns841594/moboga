import { LabelBubble } from "./LabelBubble"
import { StoryBubble } from "./StoryBubble"

export const Bubbles = () => {
  return (
    <>
    <ul className="maptree">
      <li><div className="bubble1"><StoryBubble storyId={'2'} next={true} /></div></li>
      <ul className="maptree">
        <li><div className="bubble2"><LabelBubble labelName="survival" /></div></li>
        <li>
          <div className="bubble3"><LabelBubble labelName="post_apocalyptic" /></div>
          <ul>
            <li><StoryBubble storyId={'3'} next={true} /></li>
            <li><StoryBubble storyId={'4'} next={true} /></li>
          </ul>
        </li>
        <li><div className="bubble4"><LabelBubble labelName="dystopia" /></div></li>
      </ul>
    </ul>
          
      
          
        
        
    </>
  )
}