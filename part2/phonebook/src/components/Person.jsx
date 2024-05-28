const Person = ({ person, id, handleDelete }) => {
  return (
    <>
      <div>
        {person.name} {person.number}{" "}
        <button onClick={() => handleDelete(id, person.name)}>delete</button>
      </div>
    </>
  );
};

export default Person;

