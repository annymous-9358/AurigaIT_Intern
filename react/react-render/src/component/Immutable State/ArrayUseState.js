import React, { useState } from 'react'

const initState = ['Kunik', 'Jain']
export const ArrayUseState = () => {
  const [persons, setPersons] = useState(initState)
  const handleClick = () => {
    // persons.push('Clark')
    // persons.push('Kent')
    // setPerson(persons)

    const newPersons = [...persons]
    newPersons.push('Clark')
    newPersons.push('Kent')
    setPersons(newPersons)
  }
  console.log('ArrayUseState Render')
  return (
    <div>
      <button onClick={handleClick}>Click</button>
      {persons.map(person => (
        <div key={person}>{person}</div>
      ))}
    </div>
  )
}