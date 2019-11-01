import React from 'react'

const Person = ({ person, deletePersonFunction }) => {
    return (
        <li>
            {person.name} {person.number} <button onClick={() => {
                deletePersonFunction(person.id, person.name)
            }} >
                delete
            </button >
        </li>
    )
}

const Persons = ({ persons, filterValue, deletePersonFunction }) => {
    const rows = () => persons.filter(person => person.name.toLowerCase().includes(filterValue)).map(person =>
        <Person
            key={person.id}
            person={person}
            deletePersonFunction={deletePersonFunction}
        />)
    return (
        <ul className="personList">
            {rows()}
        </ul>
    )
}

export default Persons