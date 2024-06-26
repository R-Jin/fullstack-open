import personService from "../services/persons";

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
  setStatusMessage,
  setErrorMessage,
}) => {
  const addPerson = (event) => {
    event.preventDefault();
    // Check if person is in phone book
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase(),
      )
    ) {
      // Ask if we want to update the phone number
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const duplicatePerson = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase(),
        );
        const duplicateId = duplicatePerson.id;
        const updatedPerson = { name: duplicatePerson.name, number: newNumber };
        personService
          .updatePerson(duplicateId, updatedPerson)
          .then((updatePerson) => {
            console.log(updatePerson);
            if (updatePerson) {
              const updatedPersons = persons.map((person) =>
                person.id === duplicateId ? updatePerson : person,
              );
              setPersons(updatedPersons);
              setStatusMessage(`Updated number of ${updatedPerson.name}`);
              setTimeout(() => {
                setStatusMessage(null);
              }, 5000);
            } else {
              setErrorMessage(
                `Information of ${updatedPerson.name} has already been removed from the server`,
              );
            }
          })
          .catch((error) => {
            setErrorMessage(error);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
        setNewName("");
        setNewNumber("");
      }
    } else {
      // Create person
      const newPerson = { name: newName, number: newNumber };
      personService
        .createPerson(newPerson)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setStatusMessage(`Added ${newName}`);
          setTimeout(() => {
            setStatusMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          console.log(error.response.data.error);
        });
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
