import React from "react";

const Contacts = ({ persons, handleDelete}) => {
    return (
      <li key={persons.id}>{persons.name} {persons.number} <button onClick={() => handleDelete(persons.id, persons.name)}>Delete</button></li>
    )
  }

export default Contacts