import Person from './Person'

const Persons = ({ persons, removePerson }) => {
    const personObject = persons.map((e) => {
        return (
            <Person
                key= { e.id }
                person={ e }
                removePerson ={ removePerson }
            />
        )
    });

    return (
        <div>
            { personObject }
        </div>
    )
}

export default Persons