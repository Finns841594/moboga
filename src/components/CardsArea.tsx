import { LabelCard } from "./LabelCard"

export const CardsArea = () => {
  const labelInfo = {
    backgroundColor: '#1DA1F2',
    textColor: 'white',
    text: 'sci fi'
  }

  return (
    <>
    <h2>Or explore a story?</h2>
    <div className="cards-area">
      <LabelCard />
      <LabelCard />
      <LabelCard />
      <LabelCard />
      <LabelCard />
    </div>
    </>
  )
}