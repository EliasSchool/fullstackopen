import { useState, useEffect } from 'react'
import axios from 'axios'
import contacts from './services/persons'
const Numbers = ({ persons }) => {
  return (
    <li key={persons.id}>{persons.name} {persons.number}</li>
  )
}

const Filter = ( { handleFilter, text}) => {
  return ( 
    <form>
        filter shown with<input onChange={handleFilter}></input>
      </form>
  )
}

const Addperson =  (props) => {
  return (
  <form onSubmit={props.onSubmit} >
  <div>
    name: <input onChange={props.handleNameChange}/>
  </div>
  <div>
    number: <input onChange={props.handleNumberChange}/>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
  )
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    contacts
      .GetPersons()
      .then(response => {
              setPersons(response.data)
            }) 
  }, [])



  const addNewPerson = (event) => {
    event.preventDefault()
    const numberObject = {
      name : newName,
      number: newNumber, 
    }
    const isPersonAdded = persons.some(person =>  {
      return person.name.toLowerCase() === newName.trim().toLowerCase(); 
    })
    const isNumberAdded = persons.some(person =>  {;
      return person.number === newNumber;  
    })
    if (isPersonAdded) {
      alert(`${newName} is already added to phonebook`)
    } else if (isNumberAdded) {
      alert(`${newNumber} is already added to phonebook`)
    } else {

      axios 
        .post("http://localhost:3001/persons", numberObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName("")
          setNewNumber("")
        }) 
    } 
  }

  //console.log(persons.map(person => console.log(person, "n")))

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

 const handleFilter = (event) => {
     setFilterName(event.target.value.trim().toLowerCase())
 }
 const filteredPersons = filterName
    ? persons : persons.filter(person => person.name.toLowerCase().includes(filterName))
  console.log(filteredPersons)
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}></Filter>
      <h2>add a new</h2>
      <Addperson onSubmit={addNewPerson} handleNameChange={handlePersonChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <ul>
          {filteredPersons.map(person => (
            <Numbers key ={person.id}persons={person}/>
          ))}
        </ul>
    </div>
  )
}

export default App