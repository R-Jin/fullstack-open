import Person from "./Person"

const Persons = ({filter, persons, handleDelete}) => {
    const inName = (person) => person.name.toLowerCase().includes(filter.toLowerCase()) 
    let filteredNames = persons

    if (filter !== "") {
        filteredNames = persons.filter(inName)
    }

    return (
        <>
            {filteredNames.map(person => (
                <Person key={person.id} id={person.id} person={person} handleDelete={handleDelete} />
            ))}
        </>
    )
}

export default Persons