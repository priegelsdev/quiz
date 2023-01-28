import React, { useState, useEffect } from 'react'
import Intro from './Components/Intro'
import blobOne from './assets/img/blob1.png'
import blobTwo from './assets/img/blob2.png'

export default function App() {
  const [gameStart, setGameStart] = useState(false)

  // function to handle button click as button stays on page to deal with different things
  function handleClick() {
    if (!gameStart) {
      setGameStart(true)
    } else if (gameStart) {
      console.log('check answers')
    } else {
      console.log('restart game')
    }
  }

  return (
    <main>
      <img className="blob-one" src={blobOne}/>
      {!gameStart && <Intro />}
      <button 
        className="check-btn" 
        onClick={handleClick}
      >
        Start Quiz {/* add logic so text will show check answers or restart game later on*/}
      </button> 
      <img className="blob-two" src={blobTwo}/>
    </main>
  )
}