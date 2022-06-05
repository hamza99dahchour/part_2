import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(persons => {
      setPersons(persons)
    })
  },[])

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    setNewName('')
    setNewNumber('')

    const personExistee = persons.find(p => p.name === newPerson.name)
    if ( personExistee ) {
      const ok = window.confirm(`${personExistee.name} is already added to phonebook, do you want to update this number?`)
      if ( ok ) {

        personService.update(personExistee.id, {...personExistee, number: newNumber }).then(returnedPerso => {
          setPersons(persons.map(p => p.id === personExistee.id ? returnedPerso : p ))
          notify(`updat contact of : ${returnedPerso.name}`)
        })
        .catch(error => {
          notify(
            `the person '${personExistee.name}' is already in  the server`, 'alert'
          )
          setPersons(persons.filter(p => p.id !== personExistee.id))
        })

        return 
      }
    }

    personService.create(newPerson).then(returnedPerso => {
      setPersons(persons.concat(returnedPerso))
      notify(`This contact : ${returnedPerso.name} has been added`)
    })
  }

  const deleteAccount = (id) => { 
    const PourSupprimer = persons.find(p => p.id === id)
    const ok = window.confirm(` do you want to delete : ${PourSupprimer.name}`)
    if (ok) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
        notify(`This contact : ${PourSupprimer.name} has been deleted`)
      })  
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
 
  const personsToShow = (filter.length === 0) ? persons :
    persons.filter(persone => persone.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter
        value={filter}
        handleChange={({ target }) => setFilter(target.value)}
      />
      <h2>Add a New person</h2>
      <PersonForm 
        name={newName}
        number={newNumber}
        handleNameChange={({ target }) => setNewName(target.value)}
        handleNumberChange={({ target }) => setNewNumber(target.value)}
        addPerson={addPerson}
      />
      <Persons
        persons={personsToShow}
        handleDelete={deleteAccount}
      />
    </div>
  )

}

export default App