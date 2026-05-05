const Person = ({ person, onDelete }) => {
  console.log('Person toimii', person.name)

  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => onDelete(person.id, person.name)}>delete</button>
    </li>
  )
}

export default Person