import personServices from '../services/person'

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons, setNotification, setIsError}) => {

    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
        name: newName, 
        number: newNumber,
        }

        if (persons.some(person => person.name === newName)) {
          if (window.confirm(`${personObject.name} already exists in the phonebook, replace the old number with a new one?`)) {

            const changedPerson = {
              ...persons.find(person => person.name === newName),
              number: newNumber
            }

            personServices
              .updatePerson(changedPerson.id, changedPerson)
              .then(updatedPerson => {
                const updatedPersons = persons.map(person => person.id === updatedPerson.id ? updatedPerson : person);
                setPersons(updatedPersons)
              })
              .catch(error => {
                setPersons(persons.filter(p => p.id !== changedPerson.id))
                setNotification(`Information of ${changedPerson.name} has already been removed from the server`)
                setIsError(true)
                setTimeout(() => {
                  setNotification(null)
                  setIsError(false)
                }, 5000)
              })
          }
        } else {
          personServices
            .createPerson(personObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
            })

          setNotification(`Added ${personObject.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
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
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm