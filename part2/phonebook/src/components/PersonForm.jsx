import React from 'react'

export default function PersonForm({newName, newNumber, setNewName, setNewNumber, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          <div>name: <input value={newName} onChange={event => setNewName(event.target.value)}/></div>
          <div>number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
