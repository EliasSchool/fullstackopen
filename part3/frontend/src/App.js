import { useState, useEffect } from 'react'
import axios from 'axios'
import personsDB from './services/persons'
import Contacts from './components/Contacts'
import Addperson from './components/Addperson'
import Filter from './components/Filter'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsDB
      .GetPersons()
      .then(response => {
              console.log("response", response)
              setPersons(response) 
            }) 
  }, [])



  const addNewPerson = (event, id) => {
    event.preventDefault()
    const numberObject = {
      name : newName.trim(),
      number: newNumber.trim(), 
    }
    
    console.log(id,"t")
    const isPersonAdded = persons.some(person =>  {
      return person.name.toLowerCase() === newName.trim().toLowerCase(); 
    })

    const idOfperson = persons.find(person => person.name.trim().toLowerCase() === newName.trim().toLowerCase())?.id;
    
    const isNumberAdded = persons.some(person =>  {
      return person.number === newNumber.trim();  
    })


    if (isPersonAdded && isNumberAdded) {
        alert(`${newName} is already added to phonebook`)
      }
    else if (isPersonAdded) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        console.log(numberObject, idOfperson)
        personsDB
          .updateContact(idOfperson, {...numberObject, number : newNumber})
              .then(response => {
                console.log("response", response)
                setPersons(([...persons.filter(person => person.id !== idOfperson), response]))
              })
              setMessage(`Updated ${newName}`)
          }
    }
      else if (isNumberAdded) {
        alert(`${newNumber} is already added to phonebook`)
    }
    else {
      personsDB
        .CreatePerson(numberObject)
          .then(response => {
            setPersons(persons.concat(response))
            setMessage(`Added ${newName}`)
          }) 
    } 

    setTimeout(() => {
      setMessage(null)
    }, 3000) 
  }


  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

 const handleFilter = (event) => {
     setFilterName(event.target.value.trim().toLowerCase())
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsDB 
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter(person => person.id!== id))
          setMessage(`Deleted ${name}`)

        })
        .catch (error => {
          console.log(error)
          setMessage(`Information of ${name} has alread been removed from server`)
        })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }
  }
  
  return (
  <div>
    <h2>Phonebook</h2>
    <Notification message={message}/>
    <Filter handleFilter={handleFilter}></Filter>
    <h2>add a new</h2>
      <Addperson onSubmit={addNewPerson} handleNameChange={handlePersonChange} handleNumberChange={handleNumberChange} id={filteredPersons.map(person => person.id)}/>
    <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => (
          <Contacts key ={person.id} persons={person} handleDelete={handleDelete}/>
        ))}
      </ul>
  </div>
)
}

export default App