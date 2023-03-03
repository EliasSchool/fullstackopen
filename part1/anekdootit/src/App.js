import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
    {props.text}
    </button>
  ) 
}



const Votes = (props) => {
  const styles = {
    fontSize: "20px", 
    marginBottom: "2px", 
    marginTop: "2px"
  }
  return (
    <div>
      <p style={styles}>has {props.text} votes </p>
    </div>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [selected, setSelected] = useState(0)
  const styles = {
    fontSize: "20px", 
    marginBottom: "2px", 
  }
  const giverandomAnecdote = (props) => {
    let random = Math.floor(Math.random() * anecdotes.length)
    const updatedselected = random
    setSelected(updatedselected)
  }
  
  const increasePoints = (props) => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p style={styles}>{anecdotes[selected]}</p>
        <Votes text={points[selected]}/>
      </div>
      <div>
        <Button handleClick={increasePoints} text="vote"></Button>
        <Button handleClick={giverandomAnecdote} text="next anecdote"></Button>
      </div>
      <div>
        <h1>Ancedote with most votes</h1>
        <p style={styles}>{anecdotes[points.indexOf(Math.max(...points))]}</p>
        <Votes text={points[points.indexOf(Math.max(...points))]}/>
      </div>
        

    </div>
  )
}

export default App