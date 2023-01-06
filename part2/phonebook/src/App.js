import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState(false)

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(search))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={search} setSearch={setSearch} setFilter={setFilter} />

      <h1>Add new</h1>
      <PersonForm persons={persons} setPersons={setPersons}/>

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App