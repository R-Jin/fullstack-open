import { useState } from 'react'

const App = () => {
  const anecdotesList = [
    'If it hurts, do it more often.', 
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  
  const [selected, setSelected] = useState(0)
  const [anecdotes, setAnecdotes] = useState(anecdotesList.map(anecdote => ({anecdote: anecdote, votes: 0})))

  const handleVote = () => {
    const copy = [...anecdotes]
    copy[selected].votes += 1
    setAnecdotes(copy)
  }

  const getMostVotedAnecdote = () => {
    return anecdotes.reduce((prev, current) => {
      return (prev && prev.votes > current.votes) ? prev : current
    })
  }

  const mostVoted = getMostVotedAnecdote()

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected].anecdote}</p>
      <p>has {anecdotes[selected].votes} votes</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{mostVoted.anecdote}</p>
      <p>has {mostVoted.votes} votes</p>
    </div>
  )
}

export default App