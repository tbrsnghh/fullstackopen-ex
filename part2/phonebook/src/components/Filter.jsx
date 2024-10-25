import React from 'react'

export default function Filter({searchName, setSearchName}) {
  return (
    <div>filter shown with <input value={searchName} onChange={event => setSearchName(event.target.value)}/></div>
)
}
