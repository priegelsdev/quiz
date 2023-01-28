import React, { useState, useEffect } from 'react'
import Intro from './Components/Intro'
import Question from './Components/Question'
import blobOne from './assets/img/blob1.png'
import blobTwo from './assets/img/blob2.png'

export default function App() {
  const [gameStart, setGameStart] = useState(false)
  const [questions, setQuestions] = useState([])

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

  // function to decode JSON output from API to turn encoded characters into readable chars
  function htmlDecode(input) {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent
  }

  // helper function to shuffle array of answers
  function shuffle(array) {
    for (let i = array.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * i)
      let k = array[i]
      array[i] = array[j]
      array[j] = k
    }
    return array
  }

  // effect to fetch questions on game start
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple', 
      {
        method: "GET",
/*         headers: {
          'Accept': 'application/json, charset=UTF-8',
          "Content-Type": "application/json; charset=UTF-8;",
          'Accept-Charset': 'utf-8'
        } */
      })
        .then(res => res.json())
        .then(data => {

          const questions = data.results.map(result => {
            // LOGIC FOR QUESTIONS TO BE ENCODED 
            const question = htmlDecode(result.question)

            // LOGIC FOR ANSWERS TO BE ENCODED AND SHUFFLED
            const incorrectAnswers = []
            const allAnswers = []

            allAnswers.push(htmlDecode(result.correct_answer))
            result.incorrect_answers.map(wrongAnswer => incorrectAnswers.push(htmlDecode(wrongAnswer)))
            
            incorrectAnswers.forEach(wrongAnswer => allAnswers.push(wrongAnswer))

            shuffle(allAnswers)

            return {
              question: question,
              answers: allAnswers,
              correctAnswer: htmlDecode(result.correct_answer)
            }
          })

          setQuestions(questions)

          console.log(questions)

        })
  }, [gameStart])

  const questionElements = questions.map(question => {
    return <Question 
      key = {crypto.randomUUID()}
      question = {question.question}
      answers = {question.answers}
      correctAnswer = {question.correctAnswer}
    />
  })

  return (
    <main>
      <img className="blob-one" src={blobOne}/>
      {!gameStart && <Intro />}
      {gameStart && <div className="quiz-container">
          {questionElements}
        </div>}
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