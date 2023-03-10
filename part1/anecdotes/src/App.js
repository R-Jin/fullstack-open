import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.from(Array(anecdotes.length), () => 0))

  const handleVotes = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const getMostVotes = () => {
    let mostVotesIndex = 0
    for (let i = 0; i < anecdotes.length; i++) {
      if (votes[i] > votes[mostVotesIndex]) {
        mostVotesIndex = i
      }
    }
    return mostVotesIndex
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="Next anecdote" />
      <Button handleClick={handleVotes} text="Vote" />

      <h1>Anecdotes with most votes</h1>
      <p>{anecdotes[getMostVotes()]}</p>
      <p>has {votes[getMostVotes()]} votes</p>
    </div>

  )
}

export default App