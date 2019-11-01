import React from 'react'

const Filter = ({ filterValue, filterChangeFunction }) => {
    return (
        <>
            <h3>rajaa haettavia</h3>
            <div>
                nimi: <input value={filterValue} onChange={filterChangeFunction} />
            </div>
        </>
    )
}

export default Filter