import { useState } from 'react'

const Title = ({title}) => {
  return <h1>{title}</h1>
}

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + bad + neutral

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
  <table> 
    <tbody>
      <StatisticLine text={"Good"} value={good} />
      <StatisticLine text={"Neutral"} value={neutral} />
      <StatisticLine text={"Bad"} value={bad} />
      <StatisticLine text={"All"} value={good + neutral + bad} />
      <StatisticLine text={"Average"} value={(good - bad) / all} />
      <StatisticLine text={"Positive"} value={good / all * 100} />
    </tbody>
  </table>
  )
}

const Button = ({name, handleClick}) => (
  <button onClick={handleClick}>{name}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Title title={"Give feedback"} />
      <div>
        <Button name={"Good"} handleClick={() => setGood(good + 1)} />
        <Button name={"Neutral"} handleClick={() => setNeutral(neutral + 1)} />
        <Button name={"Bad"} handleClick={() => setBad(bad + 1)} />
      </div>
      <Title title={"Statistics"} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App