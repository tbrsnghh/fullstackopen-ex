import React from "react";

export default function Persons({ persons, searchName, deletePerson }) {
  return (
    <div>
      {persons &&
        persons
          .filter((person) =>
            person.name.toLowerCase().includes(searchName.toLowerCase())
          )
          .map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
              <span><button onClick={() => deletePerson(person.id)}>delete</button></span>
            </p>
          ))}
    </div>
  );
}
