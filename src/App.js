import './index.css'
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setFilterValue] = useState('')
    const [message, setMessage] = useState('')
    const [messageClass, setMessageClass] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.map(person => person.name).includes(newName)) {
            const result = window.confirm(`${newName} on jo puhelinluettelossa, haluatko korvata vanhan numeron uudella?`);
            if (result) {
                const initialPerson = persons.find(person => person.name === newName)
                const updatedPerson = { ...initialPerson, number: newNumber }
                personService
                    .update(updatedPerson.id, updatedPerson)
                    .then(returnedPerson => {
                        setNotificationMessage(`${newName} päivitetty`, "message")
                        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
                    }).catch(error => {
                        setNotificationMessage(`Henkilö ${newName} on jo poistettu`, "error")
                        setPersons(persons.filter(person => person.id !== initialPerson.id))
                    })
                clearFields()
            }
        }
        else {
            const personObject = {
                name: newName,
                number: newNumber
            }

            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    clearFields()
                    setNotificationMessage(`${newName} lisätty`, "message")
                })
                .catch(error => {
                    setNotificationMessage(`${error.response.data.error}`, "error")
                })
        }
    }

    const clearFields = () => {
        setNewName('')
        setNewNumber('')
    }

    const setNotificationMessage = (notMessage, notMessageClass) => {
        setMessage(notMessage)
        setMessageClass(notMessageClass)
        setTimeout(() => {
            setMessage(null)
            setMessageClass(null)
        }, 5000)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFiltering = (event) => {
        setFilterValue(event.target.value)
    }

    const handleDeletePerson = (id, personName) => {
        const result = window.confirm(`Haluatko varmasti poistaa ${personName}?`);
        if (result) {
            personService.deletePerson(id)
                .then(res => {
                    setNotificationMessage(`${personName} poistettu`, "message")
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <Notification message={message} messageClass={messageClass} />
            <Filter filterValue={filterValue} filterChangeFunction={handleFiltering} />

            <h2>Numerot</h2>
            {<PersonForm submitFunction={addPerson} newName={newName} nameChangeFunction={handleNameChange}
                newNumber={newNumber} numberChangeFunction={handleNumberChange} />}

            <Persons persons={persons} filterValue={filterValue} deletePersonFunction={handleDeletePerson} />
        </div>
    )

}

export default App