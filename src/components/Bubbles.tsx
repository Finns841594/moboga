import { LabelBubble } from "./LabelBubble"
import { StoryBubble } from "./StoryBubble"

export const Bubbles = () => {
  return (
    <>
      <StoryBubble storyId={'2'} next={true} />
      <ul>
        <li>
          <LabelBubble labelName="survival" />
          <ul>
            <li><StoryBubble storyId={'3'} next={true} /></li>
            <li><StoryBubble storyId={'4'} next={true} /></li>
          </ul>
          </li>
        <li><LabelBubble labelName="post_apocalyptic" /></li>
        <li><LabelBubble labelName="dystopia" /></li>
      </ul>
    </>
  )
}