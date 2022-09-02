import React, { useState, useEffect } from 'react'
import PersonsForm from "./components/PersonsForm"
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import personsService from "./services/personsService"
import Notification from "./components/Notification"


const App = () => {
   const [ persons, setPersons ] = useState([]);
   const [ newName, setNewName ] = useState("");
   const [ newNumber, setNewNumber ] = useState("");
   const [ newFilter, setNewFilter ] = useState("");
   const [ notification, setNotification ] = useState(null);

   const personsShowList = newFilter.length === 0 ? persons : persons.filter(person => person.name.search(newFilter) >= 0);

   useEffect(() => {
      personsService
         .getAll()
         .then(initialList => {
            setPersons(initialList)
         })
   }, []);

   const addPerson = (e) => {
      e.preventDefault()

      const newPerson = {
         name: newName, 
         number: newNumber
      };

      const duplicatedPerson = persons.find(e => e.name === newName);
      const msg = `${ newName } has already been added to phonebook, replace the old number with a new one?`;
      if (duplicatedPerson) {
         if(window.confirm(msg) === true) {
            personsService
               .update(duplicatedPerson.id, newPerson)
               .then(returnedPerson => {
                  setNotification({
                     "type": "success",
                     "info": `Information of ${ newName } has been updated`
                  })
                  setTimeout(() => {
                     setNotification(null)
                  }, 4000)
                  
                  setPersons(persons.map(person => person.id !== duplicatedPerson.id ? person : returnedPerson))
               })
               .catch (() => {
                  setNotification({
                     "type": "error",
                     "info": `Sorry, information of ${ newName } was already removed from server`
                  })
                  setTimeout(() => {
                     setNotification(null)
                  }, 4500)
               })
         }
      } else {
         personsService
            .create(newPerson)
            .then(returnedPerson => {
               setNotification({
                  "type": "success",
                  "info": `Added ${ newName } to the number list`
               })
               setTimeout(() => {
                  setNotification(null)
               }, 3000)

               setPersons(persons.concat(returnedPerson))
            })
      }
      
      setNewName("")
      setNewNumber("")
   };

   const handleNewName = (e) =>  setNewName(e.target.value);
   const handleNewNumber = (e) => setNewNumber(e.target.value);
   const handleFilter = (e) => {
      const inputSearch = e.target.value;
      setNewFilter(RegExp(inputSearch, "gi"))
   };

   const deletePerson = (e) => {
      const username = e.target.name;
      const id = Number(e.target.id);
      const msg = `Delete ${ username } ?`;

      if (window.confirm(msg) === true) {
         personsService
         .remove(id)
         .then(() => {
            setNotification({
               "type": "success",
               "info": `Removed ${ username } from the number list`
            })

            setTimeout(() => {
               setNotification(null)
            }, 3500)

            setPersons(persons.filter(person => person.id !== id))
         })
         .catch (() => {
            setNotification({
               "type": "error",
               "info": `${ username } is already deleted from the server list. Updating...`
            })
            setTimeout(() => {
               setNotification(null)
            }, 4500)

            setPersons(persons.filter(person => person.id !== id))
         })
      }
   }

   return (
      <div>
         <h1>Phonebook</h1>
         <Notification message={ notification !== null ? notification : null } />

         <h2>Add a new person</h2>
         <PersonsForm 
            addPerson={ addPerson }
            handleNewName={ handleNewName }
            handleNewNumber={ handleNewNumber }
            number={ newNumber }
            name={ newName }
         />

         <h2>Numbers</h2>
         <div className='filterContainer'>
            <Filter handleFilter={ handleFilter } />
         </div>
         <div className='NumberList'>
            <Persons persons={ personsShowList } removePerson={ deletePerson } />
         </div>
      </div>
   )
};

export default App
