import Person from './Person'

const Persons = ({ persons, onDelete }) => {
  console.log('Näytetään', persons.length, 'henkilöä listassa')

  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.id} person={person} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default Persons