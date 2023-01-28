import React, { useState, useEffect } from 'react'
import Intro from './Components/Intro'
import blobOne from './assets/img/blob1.png'
import blobTwo from './assets/img/blob2.png'

export default function App() {
  return (
    <main>
      <img className="blob-one" src={blobOne}/>
      <Intro />
      <button 
        className="check-btn" 
/*         onClick={handleClick} */
      >
        Start Quiz
      </button> 
      <img className="blob-two" src={blobTwo}/>
    </main>
  )
}