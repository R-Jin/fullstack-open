import { useState } from 'react'

const Button = ({text, clickHandler}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const StatisticsLine = ({text, value}) => {
  if (text == "Positive") {
    return (
      <tr>
        <td>{text}</td><td>{value} %</td>
      </tr>
    )
  }
  return (
      <tr>
        <td>{text}</td><td>{value}</td>
      </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const getAverage = () => {
    return (good - bad) / (good + neutral + bad)
  }

  const getPositive = () => {
    return good * 100 / (good + neutral + bad)
  }

  if (good + neutral + bad == 0) {
    return (
        <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="Good" value={good} />
        <StatisticsLine text="Neutral" value={neutral} />
        <StatisticsLine text="Bad" value={bad} />
        <StatisticsLine text="Average" value={getAverage()} />
        <StatisticsLine text="Positive" value={getPositive()} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" clickHandler={() => setGood(good + 1)}/>
      <Button text="Neutral" clickHandler={() => setNeutral(neutral + 1)}/>
      <Button text="Bad" clickHandler={() => setBad(bad + 1)}/>

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App