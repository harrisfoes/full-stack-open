import { useState } from "react";

const Persons = ({ name, number }) => {
  return (
    <div key={name}>
      {name} {number}
    </div>
  );
};

const PersonForm = ({
  handleSubmit,
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number :{" "}
        <input value={newNumber} onChange={handleNewNumber} type="number" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Filter = ({ searchFilter, handleSearchFilter }) => {
  return (
    <div>
      filter shown with
      <input value={searchFilter} onChange={handleSearchFilter} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchFilter = (event) => {
    setSearchFilter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //check duplicates
    const nameDups = persons.filter((persons) => persons.name === newName);
    console.log(nameDups);
    if (nameDups.length > 0) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }

    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchFilter={searchFilter}
        handleSearchFilter={handleSearchFilter}
      />

      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      {persons
        .filter((element) =>
          //searchFilter.toLowerCase().includes(element.name.toLowerCase())
          element.name.toLowerCase().includes(searchFilter.toLowerCase())
        )
        .map((element) => (
          <Persons
            name={element.name}
            key={element.name}
            number={element.number}
          />
        ))}
    </div>
  );
};

export default App;
