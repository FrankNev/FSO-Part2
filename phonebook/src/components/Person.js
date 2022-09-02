import React from 'react'

const Person = ({ person, removePerson }) => {
   return (
      <div>
         <p>{person.name} | {person.number}</p>
         <button className='deleteButton' name={ person.name } id={ person.id } onClick={ removePerson }>Delete</button>
      </div>
   )
}; 
 
export default Person