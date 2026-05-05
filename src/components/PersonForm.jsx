const PersonForm = ({
  onSubmit,
  nameValue,
  numberValue,
  handleNameChange,
  handleNumberChange
}) => {
  console.log('Henkil\u00f6iden lis\u00e4yslomake ladataan')

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={numberValue} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm