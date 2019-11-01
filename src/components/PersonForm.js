import React from 'react'

const PersonForm = ({ submitFunction, newName, nameChangeFunction, newNumber, numberChangeFunction }) => {
    return (
        <form onSubmit={submitFunction}>
            <h3>lisää uusi</h3>
            <div>
                nimi: <input value={newName} onChange={nameChangeFunction} />
            </div>
            <div>
                numero: <input value={newNumber} onChange={numberChangeFunction} />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

export default PersonForm