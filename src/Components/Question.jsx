import Answer from "./Answer"

export default function Question(props) {
/*   const answerElements = props.answers.map(answer => {
    const styles = {outline: props.correctAnswer === answer ? '1px solid green' : '1px solid red'}

    return <span style={styles}>
      {answer}
    </span>
  }) */

  const answerElements = props.answers.map(answer => {
    return <Answer 
      key = {crypto.randomUUID()}
      id = {crypto.randomUUID()}
      correctAnswer = {props.correctAnswer}
      text = {answer.answer}
      isChecked = {props.isChecked}
      isLogged = {answer.isLogged}
      onClick = {() => props.onClick(answer.id)}
    />
  })

  return (
    <div className="question-container">
      <h2 className="question-text">{props.question}</h2>
      <div className="answers-container">
        {answerElements}
      </div>
    </div>
  )
}