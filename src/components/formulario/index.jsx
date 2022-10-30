import React, { useState, useEffect } from 'react'

export const Formulario = props => {
  const [country, setCountry] = useState([])
  const [city, setCity] = useState([])
  const [citiesFilteredByCountry, setCitiesFilteredByCountry] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [loadCountry, setLoadCountry] = useState(false)
  const [loadCity, setLoadCity] = useState(false)
  const { payLoad, setPayLoad } = props

  const handleCountryChange = e => {
    const value = e.target.value

    setPayLoad({ ...payLoad, country: value })
    const filteredCountry = country.filter(
      country => country.name_ptbr == value
    )
    if (filteredCountry.length) {
      const code = filteredCountry[0].code
      const filteredCity = city.filter(city => city.country_code == code)
      setCitiesFilteredByCountry(filteredCity)
    }
  }

  const renderCitySelector = () => {
    return (
      citiesFilteredByCountry.length > 0 && (
        <select
          onChange={e => e.preventDefault() /* escrever*/}
          placeholder="Selecione a cidade"
        >
          {citiesFilteredByCountry.map(op => (
            <option value={op.name}>{op.name}</option>
          ))}
        </select>
      )
    )
  }

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoadCountry(true)
        const res = await fetch(`https://amazon-api.sellead.com/country`)
        const fetchedCountries = await res.json()
        if (fetchedCountries) {
          setLoadCountry(false)
        }
        setCountry(fetchedCountries)
      } catch (error) {
        setLoadCountry(false)
        console.log(`Error:${error}`)
      }
    }

    const fetchCity = async () => {
      try {
        setLoadCity(true)
        const res = await fetch(`https://amazon-api.sellead.com/city`)
        const fetchedCities = await res.json()
        if (fetchedCities) {
          setLoadCity(false)
        }
        setCity(fetchedCities)
      } catch (error) {
        setLoadCity(false)
        console.log(`Error:${error}`)
      }
    }
    fetchCountry()
    fetchCity()
  }, [])
  return (
    <>
      {props.type == 'Dados Pessoais' ? (
        <div>
          <input />
          <input />
          <input />
          <input />
        </div>
      ) : (
        <div>
          {loadCountry ? (
            <p>loading</p>
          ) : (
            <select onChange={handleCountryChange}>
              <option disabled selected>
                Selecionar País
              </option>
              {country.map(op => (
                <option value={op.name_ptbr}>{op.name_ptbr}</option>
              ))}
            </select>
          )}
          {loadCity ? <p>loading</p> : renderCitySelector()}
        </div>
      )}
    </>
  )
}
