import { useEffect, useRef, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Countries from './applications/Countries'

const App = () => {
  const [tab, setTab] = useState('phonebook')
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const notificationTimeoutRef = useRef(null)

  console.log('Sovellus käynnissä, aktiivinen välilehti:', tab)

  const showNotification = (message, type) => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current)
    }

    setNotification({ message, type })
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    console.log('Henkilöitä haetaan palvelimelta')
    personService.getAll().then((response) => {
      console.log('Henkilölista saatu')
      setPersons(response)
    }).catch((error) => {
      console.error('Henkilöiden haku epäonnistui', error)
      showNotification('Failed to load phonebook entries', 'error')
    })
  }, [])

  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current)
      }
    }
  }, [])

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons

  const handleNameChange = (event) => {
    console.log('Nimi kirjoitetaan:', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('Numero kirjoitetaan:', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log('Hakua muutetaan:', event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      const shouldReplace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (!shouldReplace) {
        console.log('Käyttäjä perui päivityksen:', newName)
        return
      }

      const updatedPerson = {
        ...existingPerson,
        number: newNumber
      }

      console.log('Henkilön tiedot päivitetty:', updatedPerson)
      personService.update(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map((person) => (person.id === existingPerson.id ? returnedPerson : person)))
          setNewName('')
          setNewNumber('')
          showNotification(`Updated ${returnedPerson.name}`, 'success')
        })
        .catch((error) => {
          console.error('Päivitys epäonnistui', error)
          showNotification(`Information of ${existingPerson.name} has already been removed from server`, 'error')
          setPersons(persons.filter((person) => person.id !== existingPerson.id))
        })

      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    console.log('Uutta henkilöä lisätään:', personObject)
    personService.create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${returnedPerson.name}`, 'success')
      })
      .catch((error) => {
        console.error('Lisäys epäonnistui', error)
        showNotification('Failed to add phonebook entry', 'error')
      })
  }

  const deletePerson = (id, name) => {
    const shouldDelete = window.confirm(`Delete ${name}?`)

    if (!shouldDelete) {
      console.log('Käyttäjä perui poiston:', name)
      return
    }

    console.log('Henkilö poistetaan:', id, name)
    personService.remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id))
        showNotification(`Deleted ${name}`, 'success')
      })
      .catch((error) => {
        console.error('Poisto epäonnistui', error)
        showNotification(`Information of ${name} has already been removed from server`, 'error')
        setPersons(persons.filter((person) => person.id !== id))
      })
  }

  return (
    <div>
      <div>
        <button onClick={() => setTab('phonebook')} style={{ fontWeight: tab === 'phonebook' ? 'bold' : 'normal' }}>
          Phonebook
        </button>
        <button onClick={() => setTab('countries')} style={{ fontWeight: tab === 'countries' ? 'bold' : 'normal' }}>
          Countries
        </button>
      </div>

      {tab === 'phonebook' && (
        <div>
          <h2>Phonebook</h2>
          <Notification notification={notification} />
          <Filter value={filter} handleChange={handleFilterChange} />
          <h3>Add a new</h3>
          <PersonForm
            onSubmit={addPerson}
            nameValue={newName}
            numberValue={newNumber}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
          />
          <h2>Numbers</h2>
          <Persons persons={personsToShow} onDelete={deletePerson} />
        </div>
      )}

      {tab === 'countries' && <Countries />}
    </div>
  )
}

export default App