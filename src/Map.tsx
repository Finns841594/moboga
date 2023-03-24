import { useEffect, useState } from 'react'
import { Bubbles } from './components/Bubbles'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { LabelBubble } from './components/LabelBubble'
import { StoryBubble } from './components/StoryBubble'

export const Map = () => {
  

  return (
    <>
      <Header />
      <Bubbles />
      <Footer />
    </>
  )
}

export default Map