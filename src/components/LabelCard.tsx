import { useState } from "react"

export const LabelCard = () => {
  const color = '#1DA1F2'
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => setIsOpen(!isOpen)

  return (
    <>
    <div className="media-card" style={{ backgroundColor: color}}>
      <div className='media-card-header' onClick={handleToggle} >
        <h2 style={{ color: "white"}} onClick={handleToggle}>post-apocalyptic</h2>
      </div>
      <div >
        { isOpen ? (
        <ul className={`media-card-list ${isOpen ? 'open' : ''}`}>
          <li><a href={`./map/2`}>The Last Of Us</a></li>
          <li><a>Resident Evil</a></li>
          <li>Mad Max</li>
        </ul>
        ) : null}     
      </div>
    </div>
    </>
  )
}