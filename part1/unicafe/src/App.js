import { useState } from 'react'

const Buttons = (props) => {
  return( 
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  const statisticsStyle = { marginBottom: '2px', marginTop : '1px'} 
  return (
    <div>
      <p style = {statisticsStyle}>{props.text} {props.value}{props.symbols}</p>
    </div>
  )
}

const Statistics = (props) => {
  const nofeedbackstyle = { fontSize: '20px'}
  const statisticsStyle = { marginBottom: '2px', marginTop : '1px'} 
  if (props.totalamount === 0){
    return(
      <div>
        <p style={nofeedbackstyle}>No feedback given</p>
      </div>
    )
  } else {
    return(
      <div>
        <StatisticLine text="good" value = {props.goodamount} />
        <StatisticLine text="neutral" value = {props.neutralamount} />
        <StatisticLine text="bad" value = {props.badamount} />
        <StatisticLine text="total" value = {props.totalamount} />
        <StatisticLine text="average" value = {props.averageamount} />
        <StatisticLine text="positive" value = {props.positiveamount} symbols="%" />
    </div>
    ) 
  }

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [points, setPoints] = useState(0)
  const feedbackText = "give feedback"
  const statisticsText = "statistics"

  const increaseGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
    setPoints(points + 1)
    console.log(points)
  }

  const increaseNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(updatedNeutral + bad + good)
    console.log(points)
  }

  const increaseBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(updatedBad + good + neutral)
    setPoints(points - 1)
    console.log(points)
  }
  
  return (
    <div>
      <h1>{feedbackText}</h1>
      <Buttons handleClick={increaseGood} text="good"/>
      <Buttons handleClick={increaseNeutral} text="neutral"/>
      <Buttons handleClick={increaseBad} text="bad"/>
      <h1>{statisticsText}</h1>
      <Statistics goodamount={good} neutralamount={neutral} badamount={bad} totalamount={all} 
      averageamount = {points / all} positiveamount={(good / all) * 100}/>
    </div>
  )
}

export default App