const Persons = ({filter, persons}) => {
    const inName = (person) => person.name.toLowerCase().includes(filter.toLowerCase()) 
    let filteredNames = persons

    if (filter !== "") {
        filteredNames = persons.filter(inName)
    }

    return (
        <>
            {filteredNames.map(person => (
                <div key={person.name}>{person.name} {person.number}</div>
            ))}
        </>
    )
}

export default Persons