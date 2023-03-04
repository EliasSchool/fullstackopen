import { useState } from 'react'

const Numbers = ({ persons }) => {
  return (
    <li key={persons.name}>{persons.name} {persons.number}</li>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "040-1231244", 
      id : 1}, 
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const addNewPerson = (event) => {
    event.preventDefault()
    const numberObject = {
      name : newName,
      number: newNumber, 
      id: persons.length + 1
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
      const newPersons = persons.concat(numberObject)
      setPersons(newPersons)
      setPersonsToShow(newPersons)
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
    const searchName = event.target.value.trim().toLowerCase();
    const filteredPersons = searchName ? persons.filter(person => person.name.toLowerCase().includes(searchName)) 
    : persons;
    setPersonsToShow(filteredPersons)
 }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}></Filter>
      <h2>add a new</h2>
      <Addperson onSubmit={addNewPerson} handleNameChange={handlePersonChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => (
          <Numbers key ={person.id}persons={person}/>
        ))}
      </ul>
    </div>
  )

}

export default App