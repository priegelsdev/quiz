export default function Answer(props) {
  const styles = {outline: props.correctAnswer === props.text && props.isChecked ? 
    '1px solid green' : 
    '1px solid red'}

  return (
    <span className="answer" style={styles}>
      {props.text}
    </span>
  )
}