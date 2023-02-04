import { useState } from 'react'
import axios from 'axios'

const baseUrl = '/api/persons'

const PersonForm = ({persons, setPersons, setNotificationMessage, setError}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.some(person => person.name === newName)) {
        // alert(`${newName} is already in the phonebook`);
          if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
            const person = persons.find(p => p.name === newName)
            const url = `${baseUrl}/${person.id}`
            const updatedPerson = { ...person, number: newNumber}
            axios
              .put(url, updatedPerson)
              .then(res => {
                setPersons(persons.map(p => p.id !== person.id ? p : res.data))
              })
              .catch(() => {
                setNotificationMessage(`Information of ${person.name} has already been removed from the server`)
                setError(true)
                setTimeout(() => {
                  setNotificationMessage(null)
                  setError(false)
                }, 5000)
              })
          }
        } else {
        const newPerson = { name: newName, number: newNumber }
        axios
          .post(baseUrl, newPerson)
          .then(res => {
          setPersons(persons.concat(res.data))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Added ${res.data.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }


    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm
