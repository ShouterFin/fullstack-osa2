import { useEffect, useState } from 'react'
import CountriesList from '../components/CountriesList'
import CountryDetail from '../components/CountryDetail'
import countriesService from '../services/countries'

const Countries = () => {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [selected, setSelected] = useState(null)

  console.log('Maat-sovellus ladataan')

  useEffect(() => {
    console.log('Kaikkia maita haetaan')
    countriesService.getAll().then((countries) => {
      console.log('Maita löytyi', countries.length)
      setAllCountries(countries)
    })
  }, [])

  const handleSearch = (event) => {
    console.log('Hakutermiä muutetaan:', event.target.value)
    setSearch(event.target.value)
    setSelected(null)
  }

  const matchingCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Find countries</h2>
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={handleSearch}
      />

      {search && matchingCountries.length === 1 && !selected && (
        <CountryDetail country={matchingCountries[0]} />
      )}

      {search && matchingCountries.length > 1 && !selected && (
        <CountriesList
          countries={matchingCountries}
          onSelect={(country) => setSelected(country)}
        />
      )}

      {selected && <CountryDetail country={selected} />}

      {search && matchingCountries.length === 0 && <p>No countries found</p>}
    </div>
  )
}

export default Countries
