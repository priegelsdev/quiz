export default function Answer(props) {
  const styles = {
    border: props.isLogged ? 'none' : '1px solid #4D5B9E',
    backgroundColor: props.isLogged ? '#D6DBF5' : '#f5f7fb', 
    outline: props.correctAnswer === props.text && props.isChecked ? 
    '1px solid green' : 
    'none'}

  return (
    <span className="answer" style={styles} onClick={props.onClick}>
      {props.text}
    </span>
  )
}