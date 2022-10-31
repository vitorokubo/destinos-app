import React, { useState, useEffect } from 'react'
import './styles.scss'

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

  const handleCityChange = e => {
    const value = e.target.value
    setPayLoad({ ...payLoad, city: value })
  }
  const handleNameChange = e => {
    const value = e.target.value
    setPayLoad({ ...payLoad, name: value })
  }
  const handleEmailChange = e => {
    const value = e.target.value
    setPayLoad({ ...payLoad, email: value })
  }
  const handleTelefoneChange = e => {
    const value = e.target.value
    setPayLoad({ ...payLoad, tel: value })
  }
  const handleCPFChange = e => {
    const value = e.target.value
    setPayLoad({ ...payLoad, cpf: value })
  }

  const renderCitySelector = () => {
    return (
      citiesFilteredByCountry.length > 0 && (
        <div className="Input City">
          <label htmlFor="city">Cidade</label>
          <select
            id="city"
            onChange={handleCityChange}
            placeholder="Selecione a cidade"
          >
            <option disable selected>
              Selecionar Cidade
            </option>
            {citiesFilteredByCountry.map(op => (
              <option>{op.name_ptbr}</option>
            ))}
          </select>
        </div>
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
        <div className="DadosPessoais">
          <div className="Input Name">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Digite seu nome"
              onChange={handleNameChange}
            />
          </div>
          <div className="Input Email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              placeholder="Digite seu e-mail"
              onChange={handleEmailChange}
            />
          </div>
          <div className="Input Telefone">
            <label htmlFor="tel">Telefone</label>
            <input
              type="text"
              id="tel"
              pattern="\([0-9]{2}\) [0-9]{4,6}-[0-9]{3,4}$"
              placeholder="Digite seu telefone"
              onChange={handleTelefoneChange}
            />
          </div>
          <div className="Input CPF">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
              placeholder="Digite seu CPF"
              onChange={handleCPFChange}
            />
          </div>
        </div>
      ) : (
        <div className="Destinos">
          {loadCountry ? (
            <p>loading</p>
          ) : (
            <div className="Input Country">
              <label id="country">País</label>
              <select id="country" onChange={handleCountryChange}>
                <option disabled selected>
                  Selecionar País
                </option>
                {country.map(op => (
                  <option>{op.name_ptbr}</option>
                ))}
              </select>
            </div>
          )}
          {loadCity ? <p>loading</p> : renderCitySelector()}
        </div>
      )}
    </>
  )
}
