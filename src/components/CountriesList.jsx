const CountriesList = ({ countries, onSelect }) => {
  console.log('Maalistolle näytetään', countries.length, 'vaihtoehtoa')

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}
          {countries.length > 1 && (
            <button onClick={() => onSelect(country)}>show</button>
          )}
        </li>
      ))}
    </ul>
  )
}

export default CountriesList
