import React from "react"

const Filter = ({ handleFilter }) => { 
   return (
      <div>
         <p>Filter by name:</p>
         <input onChange={ handleFilter } />
      </div>
   )
}

export default Filter