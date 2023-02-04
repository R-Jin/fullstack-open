import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([])

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [error, setError] = useState(false)

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(search))
    : persons

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/persons")
      .then((res) => {
        console.log("fullfilled");
        setPersons(res.data)
      })
  }, [])

  const handleDelete = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      const url = `http://localhost:3001/api/persons/${id}`
      axios
        .delete(url)
        .then(res => {
          setPersons(persons.filter(person => person.id !== id))
        })
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={search} setSearch={setSearch} setFilter={setFilter} />

      <h1>Add new</h1>
      <Notification message={notificationMessage} error={error} />
      <PersonForm persons={persons} setPersons={setPersons} setNotificationMessage={setNotificationMessage} setError={setError} />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
