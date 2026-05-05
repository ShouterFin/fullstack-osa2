import axios from 'axios'
import { useEffect, useState } from 'react'

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)

  console.log('Maan tiedot näytetään:', country.name.common)

  useEffect(() => {
    const capital = country.capital ? country.capital[0] : null
    if (capital) {
      const lat = country.latlng[0]
      const lon = country.latlng[1]
      axios
        .get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
        )
        .then((response) => {
          console.log('Sää haettu pääkaupungille:', capital)
          setWeather(response.data.current)
        })
        .catch((error) => {
          console.error('Säätietoja ei saatu', error)
        })
    }
  }, [country])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages</h3>
      <ul>
        {country.languages &&
          Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={country.name.common}
        style={{ width: '100px', height: 'auto' }}
      />
      {weather && (
        <div>
          <h3>Weather in {country.capital ? country.capital[0] : 'capital'}</h3>
          <p>Temperature: {weather.temperature_2m}°C</p>
        </div>
      )}
    </div>
  )
}

export default CountryDetail
