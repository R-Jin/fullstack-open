import personService from '../services/persons'

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {

  const addPerson = (event) => {
    const newPerson = {name: newName, number: newNumber}
    event.preventDefault()
    // Check if person is in phone book
    if (persons.some(person => person.name === newName)) {
      // Ask if we want to update the phone number
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const duplicateId = persons.find(person => person.name === newName).id
        personService
          .updatePerson(duplicateId, newPerson)
          .then(updatePerson => {
            const updatedPersons = persons.map(person => person.id === duplicateId ? updatePerson : person)
            setPersons(updatedPersons)
          })
        setNewName("")
        setNewNumber("")
      }
    } else {
      // Create person
      personService
        .createPerson(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
  )
}

export default PersonForm