const Filter = ({ value, handleChange }) => {
  console.log('Suodatin käytetään:', value)

  return (
    <div>
      filter shown with: <input value={value} onChange={handleChange} />
    </div>
  )
}

export default Filter