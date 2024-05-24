import { useState, useEffect } from 'react'
import Notification from './components/Notification'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [statusMessage, setStatusMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
          .deletePerson(id)
          .then(() => {
              setPersons(persons.filter(person => person.id !== id))
          })
    }
  }

  const notificationStyle = {
    background: "lightgrey",
    fontSize: "20px",    
    borderStyle: "solid", 
    borderRadius: "5px",  
    padding: "10px",       
    marginBottom: "10px", 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification style={{...notificationStyle, color: "green"}} message={statusMessage} />
      <Notification style={{...notificationStyle, color: "red"}} message={errorMessage} />
      <Filter filter={filter} setFilter={setFilter}/>

      <h2>add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} setStatusMessage={setStatusMessage} setErrorMessage={setErrorMessage} />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App