import { useState, useEffect } from "react";
import personService from "./services/persons";

const Notification = ({ message, classType }) => {
  if (message === null) {
    return null;
  }

  return <div className={classType}>{message}</div>;
};

const Persons = ({ name, number, handleDelete }) => {
  return (
    <div>
      {name} {number} <button onClick={handleDelete}>delete</button>
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    console.log("effect");
    personService.getAll().then((response) => {
      console.log("promise fulfilled for retrieval");
      console.log(response.data);
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

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
      if (
        confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        //TODO - update with new number
        console.log(nameDups);
        const updatedPerson = { ...nameDups[0], number: newNumber };
        console.log(updatedPerson, "updated");
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((response) => {
            console.log(response.data, "data");
            setPersons(
              persons.map((person) =>
                person.id == updatedPerson.id ? response.data : person
              )
            );
          })
          .catch((error) => {
            setErrorMessage(
              `Information on '${updatedPerson.name}' was already removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      } else {
        return;
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    const personObject = { name: newName, number: newNumber };
    personService.create(personObject).then((response) => {
      console.log("post response", response);
      setPersons(persons.concat(response.data));

      setConfirmMessage(`Added ${newName} `);
      console.log(`added ${newName}`);
      setTimeout(() => {
        setConfirmMessage(null);
      }, 5000);

      setNewName("");
      setNewNumber("");
    });

    //setPersons(persons.concat({ name: newName, number: newNumber }));
  };

  const handleDelete = (id) => {
    console.log(id);
    const thisPerson = persons.filter((n) => n.id === id)[0].name;

    if (confirm(`Are you sure you want to delete ${thisPerson}?`)) {
      console.log("yes daw");
      const newPersons = persons.filter((n) => n.id !== id);
      personService.deleteEntry(id).then((response) => {
        console.log(response.data);
        setPersons(newPersons);
      });
    } else {
      console.log("no daw");
      return;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={confirmMessage} classType="confirm" />
      <Notification message={errorMessage} classType="error" />
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
            key={element.id}
            number={element.number}
            handleDelete={() => handleDelete(element.id)}
          />
        ))}
    </div>
  );
};

export default App;
