import React from "react"

const PersonsForm = ({ addPerson, handleNewName, handleNewNumber, name, number }) => { 
   return (
      <form onSubmit={ addPerson }>
         <div>
         <p>Name:</p>
            <input 
               onChange={ handleNewName }
               value={name}
            />
         </div>
         <div>
            <p>Number:</p>
            <input 
               onChange={ handleNewNumber }
               value={number}
            />
         </div>
         <br></br>
         <div>
            <button className="addButton" type="submit">Add person</button>
         </div>
      </form>
   )
}

export default PersonsForm