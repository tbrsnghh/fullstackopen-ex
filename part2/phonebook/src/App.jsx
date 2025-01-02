import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import phonebookService from "./services/phonebookService";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [notification, setNotification] = useState({ message: "", status: "" });
  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  useEffect(() => {
    const toRef = setTimeout(() => {
      setNotification({ message: "", status: "" });
      clearTimeout(toRef);
    }, 3000);
  }, [notification]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (existingPerson.number !== newNumber) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          phonebookService
            .updatePerson(existingPerson.id, {
              name: newName,
              number: newNumber,
            })
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id !== returnedPerson.id ? person : returnedPerson
                )
              );
              setNotification({
                message: `Updated ${returnedPerson.name}`,
                status: "success",
              });
            })
            .catch((error) => {
              setNotification({
                message: `Information of ${newName} has already been removed from server`,
                status: "error",
              });
            });
        }
      }
    } else {
      phonebookService
        .createPerson({ name: newName, number: newNumber })
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotification({
            message: `Added ${returnedPerson.name}`,
            status: "success",
          });
        })
        .catch((error) => {
          setNotification({
            message: `Error: ${error.response.data.error}`,
            status: "error",
          });
          console.log(error.response.data.error);
        });
    }
    setNewName("");
  };
  const deletePerson = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}?`
      )
    ) {
      phonebookService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setNotification({
          message: `Deleted ${persons.find((person) => person.id === id).name}`,
          status: "success",
        });
      }).catch((error) => {

        setNotification({
          message: `Error: ${error.response.data.error}`,
          status: "error",
        });
      });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      {notification.message && (
        <Notification message={notification.message} status={notification.status} />
      )}
      <Filter searchName={searchName} setSearchName={setSearchName} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        deletePerson={deletePerson}
        searchName={searchName}
      />
    </div>
  );
};

export default App;