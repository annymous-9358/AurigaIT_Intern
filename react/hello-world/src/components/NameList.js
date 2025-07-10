import React from 'react'
import Person from './Person'
function NameList() {
    const persons = [
        {
            id: 1,
            name: "Kunik",
            age: 22,
            skill: "React"
        },
        {
            id: 2,
            name: "Anant",
            age: 23,
            skill: "JavaScript"
        },
        {
            id: 3,
            name: "Aditya",
            age: 24,
            skill: "Python"
        }
    ]
    const personList = persons.map( person => <Person key={person.id} person= {person} />)
      
  return (
    <div>
       {personList}
    </div>
  )
}

export default NameList