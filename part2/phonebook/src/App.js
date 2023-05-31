import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personServices from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const hook = () => {
    personServices
      .getAllPersons()
      .then(returnedPerson => {
        setPersons(returnedPerson)
      })
  }

  useEffect(hook,[])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)

  const personsToShow = filter === ''     // Filter only when filter field is not empty
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))

  const handlePersonDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`))
    setPersons(persons.filter(person => person.id !== id))
    personServices.deletePerson(id)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isError={isError} />
      <Filter filter={filter} setFilter={setFilter}/>

      <h2>Add a new</h2>
      <PersonForm 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
        setIsError={setIsError}
      />

      <h2>Numbers</h2>
      {
        personsToShow.map(person => {
          return (
            <div key={person.id}>
              <p>{person.name} {person.number}</p>
              <button onClick={() => handlePersonDelete(person.id, person.name)}>Delete</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default App
