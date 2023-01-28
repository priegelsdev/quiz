export default function Answer(props) {

  const stylesUnchecked = {
    border: props.isLogged ? 'none' : '1px solid #4D5B9E',
    backgroundColor: props.isLogged ? '#D6DBF5' : '#f5f7fb'
  }
  const stylesChecked = {
    backgroundColor: bgColorCheck(),
    border: props.isLogged || props.correctAnswer === props.text ? 'none' : '1px solid #4D5B9E',
/*     background: props.correctAnswer != props.text && props.isLogged ? '#F6D9DB' : '#f5f7fb', */
    opacity: props.correctAnswer === props.text ? '1.0' : '0.5'
  }

  function bgColorCheck() {
    if (props.correctAnswer === props.text) {
      return '#94D7A2'
    } else if (props.correctAnswer != props.text && props.isLogged) {
      return '#F6D9DB'
    } else {
      return '#f5f7fb'
    }
  }

  return (
    <span className="answer" style={props.isChecked ? stylesChecked : stylesUnchecked} onClick={props.onClick}>
      {props.text}
    </span>
  )
}