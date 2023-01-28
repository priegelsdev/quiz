import React, { useState, useEffect } from 'react'
import Intro from './Components/Intro'
import Question from './Components/Question'
import blobOne from './assets/img/blob1.png'
import blobTwo from './assets/img/blob2.png'

export default function App() {
  const [gameStart, setGameStart] = useState(false)
  const [questions, setQuestions] = useState([])
  const [showAnswers, setShowAnswers] = useState(false)

  // function to handle button click as button stays on page to deal with different things
  function handleClick() {
    if (!gameStart) {
      setGameStart(true)
      document.querySelector('.check-btn').innerText = 'Check answers'
    } else if (gameStart && !showAnswers) {
      document.querySelector('.check-btn').innerText = 'Play again'
      setShowAnswers(true)
    } else {
      setGameStart(prevState => !prevState)
      setShowAnswers(prevState => !prevState)
      document.querySelector('.check-btn').innerText = 'Start quiz'
    }
  }

  // function to toggle/log answer; two loops to set the isLogged property of a single answer
  // within the questions.answers array to true; could use some refactoring...
  function toggleAnswer(id) {
  
    if (!showAnswers) {
      setQuestions(prevState => {
        const newQuestionsArray = []

        for (let i = 0; i < prevState.length; i++) {
          const newAnswersArray = []
          
          for (let j = 0; j < prevState[i].answers.length; j++) {
            const currentAnswer = prevState[i].answers[j]

            if (currentAnswer.id === id) {
              const updatedAnswer = {
                ...currentAnswer,
                isLogged: !currentAnswer.isLogged
              }
              newAnswersArray.push(updatedAnswer)
            } else {
              newAnswersArray.push(currentAnswer)
            }
          }
          
          newQuestionsArray.push({
            ...prevState[i],
            answers: newAnswersArray
          })

        }
        return newQuestionsArray
      })
    } 

  }

  // function to decode JSON output from API to turn encoded characters into readable chars
  function htmlDecode(input) {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent
  }

  // helper function to shuffle array of answers
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function shuffleObjects(array) {
    array.sort(() => Math.random() - 0.5)
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

            allAnswers.push({
              answer: htmlDecode(result.correct_answer),
              isLogged: false,
              id: crypto.randomUUID()
            })
            result.incorrect_answers.map(wrongAnswer => incorrectAnswers.push(htmlDecode(wrongAnswer)))
            
            incorrectAnswers.forEach(wrongAnswer => allAnswers.push({
              answer: wrongAnswer,
              isLogged: false,
              id: crypto.randomUUID()
            }))

            return {
              question: question,
              answers: shuffle(allAnswers),
              correctAnswer: htmlDecode(result.correct_answer)
            }
          })

          setQuestions(questions)

        })
  }, [gameStart])

  function countScore() {
    if (gameStart) {
      let score = 0;

      questions.filter(question => question.answers.map(answer => {

        if (question.correctAnswer == answer.answer && answer.isLogged) {
          score += 1;
        } 
      }))

      return score 
    }   
  }

  const questionElements = questions.map(question => {
    return <Question 
      key = {crypto.randomUUID()}
      question = {question.question}
      answers = {question.answers}
      correctAnswer = {question.correctAnswer}
      isChecked = {showAnswers}
      onClick = {toggleAnswer}
    />
  })

  return (
    <main>
      <img className="blob-one" src={blobOne}/>
      {!gameStart && <Intro />}
      {gameStart && <div className="quiz-container">
          {questionElements}
        </div>
      }
      <div className="button-score">
        {showAnswers && <p className="score">You scored {countScore()}/5 correct answers</p>}
        <button 
          className="check-btn" 
          onClick={handleClick}
        >
          Start Quiz
        </button> 
      </div>
      <img className="blob-two" src={blobTwo}/>
    </main>
  )
}